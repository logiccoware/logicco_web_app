import type { IAccountUpdatePayload } from "@/features/accounts/types";
import { useMutation } from "@tanstack/react-query";
import { accountsApiService } from "@/features/accounts/api/services";

interface IMutationArgs {
  accountId: string;
  payload: IAccountUpdatePayload;
}

export function useAccountUpdateMutation() {
  return useMutation({
    mutationFn: ({ payload, accountId }: IMutationArgs) =>
      accountsApiService.updateAccount(accountId, payload),
  });
}
