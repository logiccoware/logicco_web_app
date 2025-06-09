import { useMutation } from "@tanstack/react-query";
import { categoryApiService } from "@/features/categories/api/services";
import type { ICategoryUpdatePayload } from "@/features/categories/types";

interface IMutationArgs {
  categoryId: string;
  payload: ICategoryUpdatePayload;
}

export function useCategoryUpdateMutation() {
  return useMutation({
    mutationFn: ({ payload, categoryId }: IMutationArgs) =>
      categoryApiService.updateCategory(categoryId, payload),
  });
}
