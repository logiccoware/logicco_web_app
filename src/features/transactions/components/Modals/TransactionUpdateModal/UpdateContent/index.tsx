import type { TAccountEntity } from "@/features/accounts/schema";
import { useTransactionUpdateMutation } from "@/features/transactions/api/mutations/hooks/useTransactionUpdateMutation";
import { useTransactionForm } from "@/features/transactions/hooks/useTransactionForm";
import type {
  TGetTransaction,
  TTransactionFormFields,
} from "@/features/transactions/schema";
import type { SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { getTransactionsQueryKeys } from "@/features/transactions/api/queries/transactionsQuery";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { getTransactionQueryKeys } from "@/features/transactions/api/queries/transactionQuery";
import { useIntl } from "react-intl";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TransactionFormFields } from "@/features/transactions/components/Form/TransactionFormFields";
import { Route } from "@/routes/_protectedLayout/_transactionsLayout/transactions/list";

interface IProps {
  closeModal: () => void;
  account: TAccountEntity;
  transaction: TGetTransaction;
}

export function UpdateContent({ closeModal, transaction, account }: IProps) {
  const searchParams = Route.useSearch();
  const form = useTransactionForm({
    defaultValues: {
      date: transaction.date,
      note: transaction.note,
      amount: transaction.amount,
      accountId: account.id,
      categoryId: transaction.category.id,
      payeeId: transaction.payee.id,
      type: transaction.type,
    },
  });

  const intl = useIntl();
  const transactionUpdateMutation = useTransactionUpdateMutation();

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TTransactionFormFields> = (data) => {
    transactionUpdateMutation.mutate(
      {
        transactionId: transaction.id,
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
            queryKey: getTransactionQueryKeys(transaction.id),
          });
          queryClient.invalidateQueries({
            queryKey: getTransactionsQueryKeys(searchParams.month),
          });
          closeModal();
        },
        onError: (err) => {
          console.error("Error updating transaction:", err);
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

  return (
    <>
      <DialogContent dividers>
        <TransactionFormFields form={form} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
        >
          {intl.formatMessage({ id: "Common.forms.saveButton" })}
        </Button>
      </DialogActions>
    </>
  );
}
