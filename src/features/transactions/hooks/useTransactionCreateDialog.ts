import { useIntl } from "react-intl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTransactionForm } from "@/features/transactions/hooks/useTransactionForm";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import { useTransactionCreateMutation } from "@/features/transactions/api/mutations/hooks/useTransactionCreateMutation";
import { getTransactionsQueryKeys } from "@/features/transactions/api/queries/transactionsQuery";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useAccountDefaultCookie } from "@/features/accounts/hooks/useAccountDefaultCookie";
import { Route } from "@/routes/_protectedLayout/_transactionsLayout/transactions/list";
import type { ITransactionCreatePrefilledValues } from "@/features/transactions/types";

interface IProps {
  closeModal: () => void;
  prefilledValues: ITransactionCreatePrefilledValues | null;
}

export interface ITransactionCreateModalHookReturn {
  form: UseFormReturn<TTransactionFormFields>;
  fullScreen: boolean;
  onSubmit: SubmitHandler<TTransactionFormFields>;
  closeModal: () => void;
  hasDefaultAccount: boolean;
}

export function useTransactionCreateDialog({
  closeModal,
  prefilledValues,
}: IProps): ITransactionCreateModalHookReturn {
  const searchParams = Route.useSearch();
  const { accountDefaultCookie } = useAccountDefaultCookie();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const intl = useIntl();

  const form = useTransactionForm({
    defaultValues: {
      date: "",
      note: "",
      amount: "",
      accountId: accountDefaultCookie?.id ?? "",
      categoryId: "",
      payeeId: "",
      type: "EXPENSE",
    },
    values: prefilledValues,
  });

  const transactionCreateMutation = useTransactionCreateMutation();

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<TTransactionFormFields> = (data) => {
    transactionCreateMutation.mutate(
      {
        payload: {
          date: data.date,
          note: data.note,
          amount: data.amount,
          accountId: data.accountId,
          categoryId: data.categoryId,
          payeeId: data.payeeId,
          type: data.type,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getTransactionsQueryKeys(searchParams.month),
          });
          closeModal();
        },
        onError: () => {
          enqueueSnackbar({
            variant: "error",
            message: intl.formatMessage({
              id: DEFAULT_SNACKBAR_ERROR_MESSAGE_ID,
            }),
          });
        },
      }
    );
  };

  return {
    form,
    fullScreen,
    onSubmit,
    closeModal,
    hasDefaultAccount: Boolean(accountDefaultCookie),
  };
}
