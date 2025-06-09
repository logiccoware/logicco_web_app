import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type TGetCategoriesFlat,
  GetCategoriesFlatSchema,
  TreeViewBaseItemsSchema,
} from "@/features/categories/schema";
import type { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";
import type {
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
} from "@/features/categories/types";

export class CategoryApiService {
  constructor(private readonly supabase: SupabaseClient) {}

  private async _getFlatCategories(): Promise<TGetCategoriesFlat> {
    const { data } = await this.supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    return GetCategoriesFlatSchema.parse(data);
  }

  async getTreeViewBaseItems(): Promise<TreeViewBaseItem[]> {
    const flatCategories = await this._getFlatCategories();

    const buildTree = (parentId: string | null = null): TreeViewBaseItem[] => {
      return flatCategories
        .filter((category) => category.parent_id === parentId)
        .map((category) => ({
          id: category.id,
          label: category.name,
          children: buildTree(category.id),
        }));
    };

    return TreeViewBaseItemsSchema.parse(buildTree());
  }

  async createCategory(
    { name }: ICategoryCreatePayload,
    rootCategoryId?: string
  ): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase.from("categories").insert([
      {
        name,
        parent_id: rootCategoryId,
        user_id: user?.id,
      },
    ]);

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  async updateCategory(
    categoryId: string,
    { name }: ICategoryUpdatePayload
  ): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase
      .from("categories")
      .update({ name })
      .eq("id", categoryId)
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase
      .from("categories")
      .delete()
      .eq("id", categoryId)
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}
