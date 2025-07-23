import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TTransactionFormFields,
  TransactionFormValidationSchema,
} from "@/features/transactions/schema";
import type { ITransactionCreatePrefilledValues } from "@/features/transactions/types";

interface IProps {
  defaultValues: TTransactionFormFields;
  values: ITransactionCreatePrefilledValues | null;
}

export function useTransactionForm({
  defaultValues,
  values,
}: IProps): UseFormReturn<TTransactionFormFields> {
  const form = useForm<TTransactionFormFields>({
    defaultValues,
    resolver: zodResolver(TransactionFormValidationSchema),
    values: values
      ? {
          ...defaultValues,
          payeeId: values?.payeeId ?? "",
          amount: values?.amount ?? "",
          categoryId: values?.categoryId ?? "",
          type: values?.type ?? "EXPENSE",
          note: values?.note ?? "",
        }
      : undefined,
  });

  return form;
}
