import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  IGetTransactionsOption,
  ITransactionCreatePayload,
  ITransactionUpdatePayload,
} from "@/features/transactions/types";
import { getRangeBetweenFromMonth } from "@/features/transactions/helpers/getRangeBetweenFromMonth";
import { getDefaultAccountCookie } from "@/features/accounts/helpers/cookie";
import {
  GetTransationsSchema,
  GetTransactionsQueryResponseSchema,
  type TGetTransactions,
  GetTransactionQueryResponseSchema,
  GetTransactionSchema,
} from "@/features/transactions/schema";
import { formatAmount } from "@/features/accounts/helpers/currency";
import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";

export class TransactionApiService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getTransactions({
    queryParams,
  }: IGetTransactionsOption): Promise<TGetTransactions> {
    const accountDefaultCookie = getDefaultAccountCookie();

    if (!accountDefaultCookie) {
      return GetTransationsSchema.parse({
        account: null,
        transactions: [],
      });
    }

    const { startOfMonth, endOfMonth } = getRangeBetweenFromMonth(
      queryParams?.month
    );

    const query = this.supabase
      .from("transactions")
      .select(
        `
      id,
      date,
      note,
      created_at,
      type,
      transaction_items (
        id,
        amount
      ),
      categories:category_id (
        id,
        name,
        parent:parent_id (
          id,
          name
        )
      ),
      payees:payee_id (
        id,
        name
      )
    `
      )
      .eq("account_id", accountDefaultCookie.id)
      .gte("date", startOfMonth)
      .lte("date", endOfMonth);

    const { data, error } = await query.order("date", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }

    const validatedData = GetTransactionsQueryResponseSchema.parse(data);

    const transformedTransactions = validatedData.map((transaction) => {
      const total = transaction.transaction_items.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      const amount = formatAmount(total, accountDefaultCookie.currency);

      let categoryDisplay = transaction.categories.name;
      if (transaction.categories.parent) {
        categoryDisplay = `${transaction.categories.parent.name}:${transaction.categories.name}`;
      }

      return {
        id: transaction.id,
        date: transaction.date,
        type: transaction.type,
        amount,
        category: categoryDisplay,
        payee: transaction.payees.name,
        note: transaction.note || null,
      };
    });

    return GetTransationsSchema.parse({
      account: accountDefaultCookie,
      transactions: transformedTransactions,
    });
  }

  async getTransaction(transactionId: string) {
    const { data, error } = await this.supabase
      .from("transactions")
      .select(
        `
      id,
      date,
      note,
      created_at,
      type,
      transaction_items (
        id,
        amount
      ),
      category:category_id (
        id,
        name,
        parent:parent_id (
          id,
          name
        )
      ),
      payee:payee_id (
        id,
        name
      ),
      account:account_id (
          id,
          name,
          currency
        )
    `
      )
      .eq("id", transactionId)
      .single();

    if (error) {
      throw new Error(`Error fetching transaction: ${error.message}`);
    }

    const {
      id,
      date,
      type,
      category,
      account,
      payee,
      note,
      transaction_items,
    } = GetTransactionQueryResponseSchema.parse(data);

    const total = transaction_items.reduce((sum, item) => sum + item.amount, 0);

    return GetTransactionSchema.parse({
      id,
      date,
      note,
      amountNumeric: total,
      amount: formatAmount(total, account.currency),
      type,
      account,
      category,
      payee: {
        id: payee.id,
        name: payee.name,
      },
    });
  }

  async createTransaction(payload: ITransactionCreatePayload) {
    const user = await getUserOrFail();
    try {
      const { data: transaction, error: transactionError } = await this.supabase
        .from("transactions")
        .insert({
          date: payload.date,
          note: payload.note,
          account_id: payload.accountId,
          payee_id: payload.payeeId,
          category_id: payload.categoryId,
          user_id: user.id,
          type: payload.type,
        })
        .select("id")
        .single();

      if (transactionError) {
        throw new Error(
          `Error creating transaction: ${transactionError.message}`
        );
      }

      const { error: itemError } = await this.supabase
        .from("transaction_items")
        .insert({
          transaction_id: transaction.id,
          amount: Math.round(parseFloat(payload.amount) * 100),
          user_id: user.id,
        });

      if (itemError) {
        throw new Error(
          `Error creating transaction item: ${itemError.message}`
        );
      }
    } catch (e) {
      throw new Error(`Error creating transaction: ${(e as Error).message}`);
    }
  }

  async updateTransaction(
    transactionId: string,
    payload: ITransactionUpdatePayload
  ) {
    const user = await getUserOrFail();
    try {
      const { error: transactionError } = await this.supabase
        .from("transactions")
        .update({
          date: payload.date,
          note: payload.note,
          account_id: payload.accountId,
          payee_id: payload.payeeId,
          category_id: payload.categoryId,
          user_id: user.id,
          type: payload.type,
        })
        .eq("id", transactionId)
        .eq("user_id", user.id);

      if (transactionError) {
        throw new Error(
          `Error creating transaction: ${transactionError.message}`
        );
      }

      const { data: items, error: findError } = await this.supabase
        .from("transaction_items")
        .select("id")
        .eq("transaction_id", transactionId)
        .eq("user_id", user.id);

      if (findError) {
        throw new Error(
          `Error finding transaction items: ${findError.message}`
        );
      }

      if (!items || items.length === 0) {
        throw new Error("No transaction items found for the transaction");
      }

      // Update the first (and should be only) transaction item
      const { error: itemError } = await this.supabase
        .from("transaction_items")
        .update({
          amount: Math.round(parseFloat(payload.amount) * 100),
        })
        .eq("id", items[0].id)
        .eq("user_id", user.id);

      if (itemError) {
        throw new Error(
          `Error updating transaction item: ${itemError.message}`
        );
      }
    } catch (e) {
      throw new Error(`Error updating transaction: ${(e as Error).message}`);
    }
  }

  async deleteTransaction(transactionId: string) {
    const user = await getUserOrFail();
    const { error: transactionError } = await this.supabase
      .from("transactions")
      .delete()
      .eq("id", transactionId)
      .eq("user_id", user.id);

    if (transactionError) {
      throw new Error(
        `Error deleting transaction: ${transactionError.message}`
      );
    }
  }
}
