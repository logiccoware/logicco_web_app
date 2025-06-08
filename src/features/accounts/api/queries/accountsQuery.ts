import { queryOptions } from "@tanstack/react-query";
import { accountsApiService } from "@/features/accounts/api/services";

export const getAccountsQueryKeys = () => ["accounts"];

export const accountsQueryOptions = queryOptions({
  queryKey: getAccountsQueryKeys(),
  queryFn: () => accountsApiService.getAccounts(),
});
