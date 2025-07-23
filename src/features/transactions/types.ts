import type { TTransactionType } from "@/features/transactions/schema";

export interface IGetTransactionsOption {
  queryParams: {
    month?: string;
  };
}

export interface ITransactionPayload {
  amount: string;
  date: string;
  categoryId: string;
  payeeId: string;
  note: string | null;
  type: TTransactionType;
  accountId: string;
}

export interface ITransactionCreatePayload extends ITransactionPayload {}
export interface ITransactionUpdatePayload extends ITransactionPayload {}

export interface ITransactionCreatePrefilledValues {
  amount?: string;
  payeeId?: string;
  categoryId?: string;
  type?: TTransactionType;
  note?: string;
}
