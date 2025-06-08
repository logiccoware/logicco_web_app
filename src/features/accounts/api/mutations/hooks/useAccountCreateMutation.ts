import type { IAccountCreatePayload } from "@/features/accounts/types";
import { useMutation } from "@tanstack/react-query";
import { accountsApiService } from "@/features/accounts/api/services";

interface IMutationArgs {
  payload: IAccountCreatePayload;
}

export function useAccountCreateMutation() {
  return useMutation({
    mutationFn: ({ payload }: IMutationArgs) =>
      accountsApiService.createAccount(payload),
  });
}
