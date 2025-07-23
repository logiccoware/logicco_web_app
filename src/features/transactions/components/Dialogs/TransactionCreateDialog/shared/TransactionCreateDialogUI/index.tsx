import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { FormattedMessage, useIntl } from "react-intl";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import { TransactionFormFields } from "@/features/transactions/components/Form/TransactionFormFields";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";

interface IProps {
  isLoading?: boolean;
  isError?: boolean;
  form: UseFormReturn<TTransactionFormFields>;
  fullScreen: boolean;
  onSubmit: SubmitHandler<TTransactionFormFields>;
  closeModal: () => void;
  hasDefaultAccount: boolean;
}

interface IContentProps {
  isLoading?: boolean;
  isError?: boolean;
  form: UseFormReturn<TTransactionFormFields>;
  hasDefaultAccount: boolean;
}

function Content({
  isError,
  isLoading,
  form,
  hasDefaultAccount,
}: IContentProps) {
  if (isLoading) {
    return <ModalContentLoading />;
  }

  if (isError) {
    <ModalContentMessage type="error">
      <FormattedMessage id="Common.genericErrorMessage" />
    </ModalContentMessage>;
  }

  if (!hasDefaultAccount) {
    <ModalContentMessage type="error">
      <FormattedMessage id="Transactions.form.fields.account.noDefaultAccountMessage" />
    </ModalContentMessage>;
  }

  return <TransactionFormFields form={form} />;
}

export function TransactionCreateDialogUI({
  fullScreen,
  closeModal,
  form,
  onSubmit,
  hasDefaultAccount,
  isError,
  isLoading,
}: IProps) {
  const intl = useIntl();
  return (
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
        <Content
          isLoading={isLoading}
          isError={isError}
          form={form}
          hasDefaultAccount={hasDefaultAccount}
        />
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
  );
}
