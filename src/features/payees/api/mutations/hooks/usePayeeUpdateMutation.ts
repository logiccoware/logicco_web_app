import type { IPayeeUpdatePayload } from "@/features/payees/types";
import { useMutation } from "@tanstack/react-query";
import { payeeApiService } from "@/features/payees/api/services";

interface IMutationArgs {
  payeeId: string;
  payload: IPayeeUpdatePayload;
}

export function usePayeeUpdateMutation() {
  return useMutation({
    mutationFn: ({ payload, payeeId }: IMutationArgs) =>
      payeeApiService.updatePayee(payeeId, payload),
  });
}
