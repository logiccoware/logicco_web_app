
import { useMutation } from "@tanstack/react-query";
import { payeeApiService } from "@/features/payees/api/services";

interface IMutationArgs {
  payeeId: string;
}

export function usePayeeDeleteMutation() {
  return useMutation({
    mutationFn: ({ payeeId }: IMutationArgs) =>
      payeeApiService.deletePayee(payeeId),
  });
}
