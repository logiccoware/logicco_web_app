import { useMutation } from "@tanstack/react-query";
import { categoryApiService } from "@/features/categories/api/services";
import type { ICategoryCreatePayload } from "@/features/categories/types";

interface IMutationArgs {
  rootCategoryId?: string;
  payload: ICategoryCreatePayload;
}

export function useCategoryCreateMutation() {
  return useMutation({
    mutationFn: ({ payload, rootCategoryId }: IMutationArgs) =>
      categoryApiService.createCategory(payload, rootCategoryId),
  });
}
