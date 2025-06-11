import type { ITransactionCreatePayload } from "@/features/transactions/types";
import { useMutation } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";

interface IMutationArgs {
  payload: ITransactionCreatePayload;
}

export function useTransactionCreateMutation() {
  return useMutation({
    mutationFn: ({ payload }: IMutationArgs) =>
      transactionApiService.createTransaction(payload),
  });
}
