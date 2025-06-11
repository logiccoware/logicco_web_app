import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  IGetSpendingByCategoryOptions,
  IGetSpendingByPayeeOptions,
} from "@/features/spendings/types";
import { getRangeBetweenFromMonth } from "@/features/transactions/helpers/getRangeBetweenFromMonth";
import { getDefaultAccountCookie } from "@/features/accounts/helpers/cookie";
import type {
  TCategorySpendingChildItem,
  TCategorySpendingListItem,
  TCategorySpendingPieChart,
  TGetSpendingByCategory,
  TGetSpendingByPayee,
  TPayeeSpending,
  TPayeeSpendingPieChart,
} from "@/features/spendings/schema";
import {
  GetSpendingByCategoriesRawQueryResponse,
  GetSpendingByPayeeRawQueryResponse,
} from "@/features/spendings/schema";
import { getTransactionType } from "@/features/transactions/helpers/getTransactionType";
import currency from "currency.js";
import { formatCurrency } from "@/features/accounts/helpers/currency";

export class SpendingApiService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getSpendingByPayee({
    transactionType,
    month,
  }: IGetSpendingByPayeeOptions): Promise<TGetSpendingByPayee> {
    const { startOfMonth, endOfMonth } = getRangeBetweenFromMonth(month);

    const account = getDefaultAccountCookie();

    if (!account) {
      return {
        hasDefaultSelectedAccount: false,
        list: [],
        pieChartData: [],
      };
    }

    const { data: transactions, error } = await this.supabase
      .from("transactions")
      .select(
        `
      id,
      date,
      type,        
      payee:payees(id, name),
      transaction_items:transaction_items(id, amount)
    `
      )
      .eq("account_id", account.id)
      .eq("type", getTransactionType(transactionType))
      .gte("date", startOfMonth)
      .lte("date", endOfMonth)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching payee spendings:", error);
      throw error;
    }

    const queryRes = GetSpendingByPayeeRawQueryResponse.parse(transactions);

    // Group transactions by payee and calculate total amount
    const payeeMap = new Map<
      string,
      { id: string; name: string; totalAmount: number }
    >();

    queryRes.forEach((transaction) => {
      if (!transaction.payee) return;

      const payee = Array.isArray(transaction.payee)
        ? transaction.payee[0]
        : transaction.payee;

      if (!payee || !payee.id) return;

      const payeeId = payee.id;
      const payeeName = payee.name;

      let totalAmount = 0;
      transaction.transaction_items.forEach((item) => {
        // No need to divide by 100, the values are already correct
        totalAmount = currency(totalAmount).add(item.amount).value;
      });

      if (payeeMap.has(payeeId)) {
        const existingPayee = payeeMap.get(payeeId)!;
        existingPayee.totalAmount = currency(existingPayee.totalAmount).add(
          totalAmount
        ).value;
      } else {
        payeeMap.set(payeeId, {
          id: payeeId,
          name: payeeName,
          totalAmount: totalAmount,
        });
      }
    });

    const list: TPayeeSpending[] = [];
    const pieChartData: TPayeeSpendingPieChart[] = [];

    let colorIndex = 0;

    payeeMap.forEach((payee) => {
      list.push({
        id: payee.id,
        name: payee.name,
        amount: formatCurrency(payee.totalAmount, account.currency),
      });

      pieChartData.push({
        id: payee.id,
        label: payee.name,
        value: currency(payee.totalAmount, { fromCents: true }).value,
      });

      colorIndex++;
    });

    // Sort list by amount (highest to lowest)
    list.sort(
      (a, b) =>
        parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
    );

    // Sort pie chart data by value (highest to lowest)
    pieChartData.sort((a, b) => b.value - a.value);

    return {
      hasDefaultSelectedAccount: true,
      list,
      pieChartData,
    };
  }

  async getSpendingByCategories({
    transactionType,
    month,
  }: IGetSpendingByCategoryOptions): Promise<TGetSpendingByCategory> {
    const account = getDefaultAccountCookie();

    if (!account) {
      return {
        hasDefaultSelectedAccount: false,
        list: [],
        pieChartData: [],
      };
    }

    const { startOfMonth, endOfMonth } = getRangeBetweenFromMonth(month);

    const { data: rawTransactions, error } = await this.supabase
      .from("transactions")
      .select(
        `
      id, 
      date, 
      type,
      category:category_id!inner (
        id,
        name,
        parent:parent_id (id, name)
      ),
      transaction_items:transaction_items!inner (
        amount
      )
    `
      )
      .eq("account_id", account.id)
      .eq("type", getTransactionType(transactionType))
      .not("category_id", "is", null) // Ensure transaction has a category
      .gte("date", startOfMonth)
      .lte("date", endOfMonth);

    if (error) {
      console.error(
        "Error fetching transactions for category spending:",
        error
      );
      throw new Error(
        `Supabase error: ${error.message} (Code: ${error.code}, Details: ${error.details})`
      );
    }

    const parsedTransactions =
      GetSpendingByCategoriesRawQueryResponse.parse(rawTransactions);

    const aggregatedCategories = new Map<
      string,
      {
        id: string;
        name: string;
        totalAmount: number;
        children: Map<string, { id: string; name: string; amount: number }>;
      }
    >();

    parsedTransactions.forEach((transaction) => {
      // Sum all item amounts for this transaction
      const totalAmountForTransaction = transaction.transaction_items.reduce(
        (sum, item) => currency(sum).add(item.amount).value,
        0
      );

      if (totalAmountForTransaction === 0) {
        return; // Skip if transaction has no value
      }

      const directCategory = transaction.category; // Category is at the transaction level

      let mainListCategoryId: string;
      let mainListCategoryName: string;
      let childCategoryId: string | null = null;
      let childCategoryName: string | null = null;

      if (directCategory.parent) {
        mainListCategoryId = directCategory.parent.id;
        mainListCategoryName = directCategory.parent.name;
        childCategoryId = directCategory.id;
        childCategoryName = directCategory.name;
      } else {
        mainListCategoryId = directCategory.id;
        mainListCategoryName = directCategory.name;
      }

      if (!aggregatedCategories.has(mainListCategoryId)) {
        aggregatedCategories.set(mainListCategoryId, {
          id: mainListCategoryId,
          name: mainListCategoryName,
          totalAmount: 0,
          children: new Map(),
        });
      }

      const mainCategoryEntry = aggregatedCategories.get(mainListCategoryId)!;
      mainCategoryEntry.totalAmount = currency(
        mainCategoryEntry.totalAmount
      ).add(totalAmountForTransaction).value;

      if (childCategoryId && childCategoryName) {
        if (!mainCategoryEntry.children.has(childCategoryId)) {
          mainCategoryEntry.children.set(childCategoryId, {
            id: childCategoryId,
            name: childCategoryName,
            amount: 0,
          });
        }
        const childEntry = mainCategoryEntry.children.get(childCategoryId)!;
        childEntry.amount = currency(childEntry.amount).add(
          totalAmountForTransaction
        ).value;
      }
    });

    const list: TCategorySpendingListItem[] = [];
    const pieChartData: TCategorySpendingPieChart[] = [];
    let colorIndex = 0;

    aggregatedCategories.forEach((categoryData) => {
      const childrenList: TCategorySpendingChildItem[] = [];
      categoryData.children.forEach((child) => {
        childrenList.push({
          id: child.id,
          name: child.name,
          amount: formatCurrency(child.amount, account.currency),
        });
      });

      childrenList.sort(
        (a, b) =>
          parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) -
          parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
      );

      list.push({
        id: categoryData.id,
        name: categoryData.name,
        totalAmount: formatCurrency(categoryData.totalAmount, account.currency),
        children: childrenList,
      });

      pieChartData.push({
        label: categoryData.name,
        value: currency(categoryData.totalAmount, { fromCents: true }).value,
        id: categoryData.id,
      });
      colorIndex++;
    });

    list.sort(
      (a, b) =>
        parseFloat(b.totalAmount.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.totalAmount.replace(/[^0-9.-]+/g, ""))
    );

    pieChartData.sort((a, b) => b.value - a.value);

    return {
      hasDefaultSelectedAccount: true,
      list,
      pieChartData,
    };
  }
}
