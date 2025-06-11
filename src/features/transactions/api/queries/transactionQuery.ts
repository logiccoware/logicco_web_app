import { queryOptions } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";

export const getTransactionQueryKeys = (transactionId: string) => [
  "transactions",
  transactionId,
];

export const transactionQueryOptions = (transactionId: string) =>
  queryOptions({
    queryKey: getTransactionQueryKeys(transactionId),
    queryFn: () => transactionApiService.getTransaction(transactionId),
  });
