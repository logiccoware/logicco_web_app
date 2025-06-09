import { z } from "zod";

export type TCategoryFlat = z.infer<typeof CategoryFlatSchema>;
export const CategoryFlatSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  parent_id: z.string().nullable(),
  created_at: z.string().min(1),
  user_id: z.string().min(1),
});

export type TGetCategoriesFlat = z.infer<typeof GetCategoriesFlatSchema>;
export const GetCategoriesFlatSchema = z.array(CategoryFlatSchema);

export type TCategoyFormFields = z.infer<typeof CategoyFormFieldsSchema>;
export const CategoyFormFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const TreeViewBaseItem = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  children: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
    })
  ),
});
export const TreeViewBaseItemsSchema = z.array(TreeViewBaseItem);
