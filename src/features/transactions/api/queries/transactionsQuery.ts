import { queryOptions } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";
import type { IGetTransactionsOption } from "@/features/transactions/types";

export const getTransactionsQueryKeys = (month?: string) => [
  "transactions",
  { month },
];

export const transactionsQueryOptions = (options: IGetTransactionsOption) =>
  queryOptions({
    queryKey: getTransactionsQueryKeys(options.queryParams.month),
    queryFn: () => transactionApiService.getTransactions(options),
  });
