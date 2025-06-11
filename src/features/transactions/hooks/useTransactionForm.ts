import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TTransactionFormFields,
  TransactionFormValidationSchema,
} from "@/features/transactions/schema";

interface IProps {
  defaultValues: TTransactionFormFields;
}

export function useTransactionForm({
  defaultValues,
}: IProps): UseFormReturn<TTransactionFormFields> {
  return useForm({
    defaultValues,
    resolver: zodResolver(TransactionFormValidationSchema),
  });
}
