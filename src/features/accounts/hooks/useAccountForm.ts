import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccountFormValidationFieldsSchema,
  type TAccountFormFields,
} from "@/features/accounts/schema";

interface IProps {
  defaultValues?: TAccountFormFields;
}

export function useAccountForm({
  defaultValues = {
    name: "",
    currency: "CAD",
  },
}: IProps): UseFormReturn<TAccountFormFields> {
  return useForm({
    defaultValues,
    resolver: zodResolver(AccountFormValidationFieldsSchema),
  });
}
