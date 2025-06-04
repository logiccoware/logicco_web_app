import { queryOptions } from "@tanstack/react-query";
import { payeeApiService } from "@/features/payees/api/services";

export const getPayeeQueryKeys = (payeeId: string) => ["payee", payeeId];

export const payeeQuery = (payeeId: string) =>
  queryOptions({
    queryKey: getPayeeQueryKeys(payeeId),
    queryFn: () => payeeApiService.getPayee(payeeId),
  });
