import { useIntl } from "react-intl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { TransactionFormFields } from "../../Form/TransactionFormFields";
import { useTransactionForm } from "@/features/transactions/hooks/useTransactionForm";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import { useTransactionCreateMutation } from "@/features/transactions/api/mutations/hooks/useTransactionCreateMutation";
import { getTransactionsQueryKeys } from "@/features/transactions/api/queries/transactionsQuery";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useAccountDefaultCookie } from "@/features/accounts/hooks/useAccountDefaultCookie";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { Route } from "@/routes/_protectedLayout/_transactionsLayout/transactions/list";

interface IProps {
  closeModal: () => void;
}

export function TransactionCreateModal({ closeModal }: IProps) {
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
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({
              id: "Accounts.notifications.created",
            }),
          });
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

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={!fullScreen}
        maxWidth={fullScreen ? undefined : "sm"}
        open
        onClose={closeModal}
        scroll="paper"
      >
        <DialogTitle>
          {intl.formatMessage({ id: "Transactions.modals.create.title" })}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {!accountDefaultCookie ? (
            <ModalContentMessage type="error">
              {intl.formatMessage({
                id: "Transactions.form.fields.account.noDefaultAccountMessage",
              })}
            </ModalContentMessage>
          ) : (
            <TransactionFormFields form={form} />
          )}
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
      </Dialog>
    </>
  );
}
