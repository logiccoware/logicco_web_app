import { useMutation } from "@tanstack/react-query";
import { accountsApiService } from "@/features/accounts/api/services";

interface IMutationArgs {
  accountId: string;
}

export function useAccountDeleteMutation() {
  return useMutation({
    mutationFn: ({ accountId }: IMutationArgs) =>
      accountsApiService.deleteAccount(accountId),
  });
}
