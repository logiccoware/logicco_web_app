import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TCategoyFormFields,
  CategoyFormFieldsSchema,
} from "@/features/categories/schema";

interface IProps {
  defaultValues: TCategoyFormFields;
}

export function useCategoryForm({
  defaultValues,
}: IProps): UseFormReturn<TCategoyFormFields> {
  return useForm({
    defaultValues,
    resolver: zodResolver(CategoyFormFieldsSchema),
  });
}
