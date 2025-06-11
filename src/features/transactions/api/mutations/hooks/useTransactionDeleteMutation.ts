import { useMutation } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";

interface IMutationArgs {
  transactionId: string;}

export function useTransactionDeleteMutation() {
  return useMutation({
    mutationFn: ({ transactionId }: IMutationArgs) =>
      transactionApiService.deleteTransaction(transactionId),
  });
}
