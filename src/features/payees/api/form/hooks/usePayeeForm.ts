import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TPayeeFormValidatedFields,
  payeeFormValidationSchema,
} from "@/features/payees/api/form/schema";

interface IProps {
  defaultValues?: TPayeeFormValidatedFields;
}

export function usePayeeForm({
  defaultValues = {
    name: "",
  },
}: IProps): UseFormReturn<TPayeeFormValidatedFields> {
  return useForm({
    defaultValues,
    resolver: zodResolver(payeeFormValidationSchema),
  });
}
