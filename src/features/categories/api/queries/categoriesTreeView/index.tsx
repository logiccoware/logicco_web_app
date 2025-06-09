import { queryOptions } from "@tanstack/react-query";
import { categoryApiService } from "@/features/categories/api/services";

export const getCategoriesTreeViewQueryKey = () => ["categoriesTreeView"];

export const categoriesTreeViewQueryOptions = queryOptions({
  queryKey: getCategoriesTreeViewQueryKey(),
  queryFn: () => categoryApiService.getTreeViewBaseItems(),
});
