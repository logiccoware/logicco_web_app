import type { TTransactionType } from "@/features/transactions/schema";

export interface IGetSpendingOptions {
  transactionType: TTransactionType;
  month?: string;
}
export interface IGetSpendingByPayeeOptions extends IGetSpendingOptions {}
export interface IGetSpendingByCategoryOptions extends IGetSpendingOptions {}
