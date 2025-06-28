import { z } from "zod";
import { TransactionTypeSchema } from "@/features/transactions/schema";

export const GetSpendingByPayeeRawQueryResponse = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().min(1),
    type: TransactionTypeSchema,
    transaction_items: z.array(
      z.object({
        id: z.string().min(1),
        amount: z.number(),
      })
    ),
    payee: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
  })
);

export type TPayeeSpendingPieChart = z.infer<
  typeof PayeeSpendingPieChartSchema
>;
export const PayeeSpendingPieChartSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
  id: z.string().min(1),
});

export type TPayeeSpending = z.infer<typeof PayeeSpendingListSchema>;
export const PayeeSpendingListSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  amount: z.number(),
});

export type TGetSpendingByPayee = z.infer<typeof GetSpendingByPayeeSchema>;
export const GetSpendingByPayeeSchema = z.object({
  hasDefaultSelectedAccount: z.boolean(),
  pieChartData: z.array(PayeeSpendingPieChartSchema),
  list: z.array(PayeeSpendingListSchema),
});

// --- Zod Schemas for Raw Supabase Response ---
const CategoryDataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const ParentCategoryDataSchema = CategoryDataSchema.nullable();

const RawCategoryWithParentSchema = CategoryDataSchema.extend({
  parent: ParentCategoryDataSchema,
});

const RawTransactionItemSchema = z.object({
  amount: z.number(),
});

const RawTransactionWithCategoryAndItemsSchema = z.object({
  category: RawCategoryWithParentSchema, // Category is directly on the transaction
  transaction_items: z.array(RawTransactionItemSchema), // Items to sum amounts
});

export const GetSpendingByCategoriesRawQueryResponse = z.array(
  RawTransactionWithCategoryAndItemsSchema
);

export const CategorySpendingPieChartSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
  id: z.string().min(1),
});
export type TCategorySpendingPieChart = z.infer<
  typeof CategorySpendingPieChartSchema
>;

export const CategorySpendingChildItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  amount: z.string().min(1),
});
export type TCategorySpendingChildItem = z.infer<
  typeof CategorySpendingChildItemSchema
>;

export const CategorySpendingListItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  totalAmount: z.number(),
  children: z.array(CategorySpendingChildItemSchema),
});
export type TCategorySpendingListItem = z.infer<
  typeof CategorySpendingListItemSchema
>;

export const GetSpendingByCategorySchema = z.object({
  hasDefaultSelectedAccount: z.boolean(),
  pieChartData: z.array(CategorySpendingPieChartSchema),
  list: z.array(CategorySpendingListItemSchema),
});
export type TGetSpendingByCategory = z.infer<
  typeof GetSpendingByCategorySchema
>;
