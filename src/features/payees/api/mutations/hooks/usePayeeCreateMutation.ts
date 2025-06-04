import type { IPayeeCreatePayload } from "@/features/payees/types";
import { useMutation } from "@tanstack/react-query";
import { payeeApiService } from "../../services";

interface IMutationArgs {
  payload: IPayeeCreatePayload;
}

export function usePayeeCreateMutation() {
  return useMutation({
    mutationFn: ({ payload }: IMutationArgs) =>
      payeeApiService.createPayee(payload),
  });
}
