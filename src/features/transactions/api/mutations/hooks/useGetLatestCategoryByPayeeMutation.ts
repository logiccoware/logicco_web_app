import { useMutation } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/services";

interface IMutationArgs {
  accountId: string;
  payeeId: string;
}

export function useGetLatestCategoryByPayeeMutation() {
  return useMutation({
    mutationFn: ({ payeeId, accountId }: IMutationArgs) =>
      transactionApiService.getLatestUsedCategoryIdByPayeeId(
        payeeId,
        accountId
      ),
  });
}
