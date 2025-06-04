import { queryOptions } from "@tanstack/react-query";
import { payeeApiService } from "@/features/payees/api/services";

export const getPayeesListQueryKeys = () => ["payees"];

export const payeesListQueryOptions = queryOptions({
  queryKey: getPayeesListQueryKeys(),
  queryFn: () => payeeApiService.getPayees(),
});
