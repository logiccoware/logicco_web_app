import { useMutation } from "@tanstack/react-query";
import { categoryApiService } from "@/features/categories/api/services";

interface IMutationArgs {
  categoryId: string;
}

export function useCategoryDeleteMutation() {
  return useMutation({
    mutationFn: ({ categoryId }: IMutationArgs) =>
      categoryApiService.deleteCategory(categoryId),
  });
}
