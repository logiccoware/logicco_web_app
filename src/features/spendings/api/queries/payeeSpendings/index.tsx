import { queryOptions } from "@tanstack/react-query";
import { spendingApiService } from "@/features/spendings/api/services";
import type { IGetSpendingByPayeeOptions } from "@/features/spendings/types";

export const getPayeeSpendingsQueryKey = ({
  month,
  transactionType,
}: IGetSpendingByPayeeOptions) => [
  "payeeSpendings",
  {
    month,
    transactionType,
  },
];

export const payeeSpendingsQueryOptions = (
  options: IGetSpendingByPayeeOptions
) =>
  queryOptions({
    queryKey: getPayeeSpendingsQueryKey(options),
    queryFn: () => spendingApiService.getSpendingByPayee(options),
  });
