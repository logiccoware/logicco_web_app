import { queryOptions } from "@tanstack/react-query";
import { spendingApiService } from "@/features/spendings/api/services";
import type { IGetSpendingByCategoryOptions } from "@/features/spendings/types";

export const getCategorySpendingsQueryKey = ({
  month,
  transactionType,
}: IGetSpendingByCategoryOptions) => [
  "categorySpendings",
  {
    month,
    transactionType,
  },
];

export const categorySpendingsQueryOptions = (
  options: IGetSpendingByCategoryOptions
) =>
  queryOptions({
    queryKey: getCategorySpendingsQueryKey(options),
    queryFn: () => spendingApiService.getSpendingByCategories(options),
  });
