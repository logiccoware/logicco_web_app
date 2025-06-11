import { TRANSACTION_TYPES } from "@/features/transactions/constants";
import type { TTransactionType } from "@/features/transactions/schema";

export function getTransactionType(type?: string): TTransactionType {
  if (type === TRANSACTION_TYPES.EXPENSE) {
    return TRANSACTION_TYPES.EXPENSE;
  }
  if (type === TRANSACTION_TYPES.INCOME) {
    return TRANSACTION_TYPES.INCOME;
  }
  return TRANSACTION_TYPES.EXPENSE;
}
