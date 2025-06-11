import { CurrencyCodeSchema } from "@/features/accounts/schema";
import { z } from "zod";

export type TTransactionType = z.infer<typeof TransactionTypeSchema>;
export const TransactionTypeSchema = z.enum(["INCOME", "EXPENSE"], {
  message: "Invalid transaction type",
});

export type TTransactionFormFields = z.infer<
  typeof TransactionFormValidationSchema
>;
export const TransactionFormValidationSchema = z.object({
  date: z
    .string({
      message: "Invalid date format",
    })
    .min(1, "Date is required"),
  amount: z
    .string({
      message: "Invalid amount format",
    })
    .transform((val) => val.replace("$", ""))
    .pipe(z.string().min(1, "Amount is required")),
  categoryId: z
    .string({ message: "Invalid category" })
    .min(1, "Category is required"),
  payeeId: z
    .string({
      message: "Invalid payee",
    })
    .min(1, "Payee is required"),
  note: z
    .string({
      message: "Invalid note",
    })
    .nullable(),
  type: TransactionTypeSchema,
  accountId: z
    .string({
      message: "Invalid account",
    })
    .min(1, "Account is required"),
});

export const GetTransactionsQueryResponseSchema = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().min(1),
    note: z.string().nullable(),
    created_at: z.string().min(1),
    type: TransactionTypeSchema,
    transaction_items: z.array(
      z.object({
        id: z.string().min(1),
        amount: z.number(),
      })
    ),
    categories: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      parent: z
        .object({
          id: z.string().min(1),
          name: z.string().min(1),
        })
        .nullable(),
    }),
    payees: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
  })
);

export type TTransaction = z.infer<typeof TransactionSchema>;
export const TransactionSchema = z.object({
  id: z.string().min(1),
  amount: z.string().min(1),
  date: z.string().min(1),
  category: z.string().min(1),
  payee: z.string().min(1),
  note: z.string().nullable(),
  type: TransactionTypeSchema,
});

export type TGetTransactions = z.infer<typeof GetTransationsSchema>;
export const GetTransationsSchema = z.object({
  account: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      currency: CurrencyCodeSchema,
    })
    .nullable(),
  transactions: z.array(TransactionSchema),
});

export const GetTransactionQueryResponseSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  note: z.string().nullable(),
  type: TransactionTypeSchema,
  account: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    currency: CurrencyCodeSchema,
  }),
  transaction_items: z.array(
    z.object({
      id: z.string().min(1),
      amount: z.number(),
    })
  ),
  category: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    parent: z
      .object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
      .nullable(),
  }),
  payee: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});

export type TGetTransaction = z.infer<typeof GetTransactionSchema>;
export const GetTransactionSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  note: z.string().nullable(),
  amount: z.string().min(1),
  amountNumeric: z.number(),
  type: TransactionTypeSchema,
  account: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    currency: CurrencyCodeSchema,
  }),
  category: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    parent: z
      .object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
      .nullable(),
  }),
  payee: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});
