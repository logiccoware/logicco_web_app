import { queryOptions } from "@tanstack/react-query";
import { accountsApiService } from "@/features/accounts/api/services";

export const getAccountQueryKeys = (accountId: string) => [
  "account",
  accountId,
];

export const accountQueryOptions = (accountId: string) =>
  queryOptions({
    queryKey: getAccountQueryKeys(accountId),
    queryFn: () => accountsApiService.getAccount(accountId),
  });
