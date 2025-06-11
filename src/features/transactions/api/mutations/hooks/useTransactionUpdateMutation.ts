import type { ITransactionUpdatePayload } from "@/features/transactions/types";
import { useMutation } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";

interface IMutationArgs {
  transactionId: string;
  payload: ITransactionUpdatePayload;
}

export function useTransactionUpdateMutation() {
  return useMutation({
    mutationFn: ({ payload, transactionId }: IMutationArgs) =>
      transactionApiService.updateTransaction(transactionId, payload),
  });
}
