import { useTransactionCreateDialog } from "@/features/transactions/hooks/useTransactionCreateDialog";
import { TransactionCreateDialogUI } from "@/features/transactions/components/Dialogs/TransactionCreateDialog/shared/TransactionCreateDialogUI";

interface IProps {
  closeModal: () => void;
}

export function TransactionCreateDialog({ closeModal }: IProps) {
  const { fullScreen, form, onSubmit, hasDefaultAccount } =
    useTransactionCreateDialog({
      closeModal,
      prefilledValues: null,
    });

  return (
    <TransactionCreateDialogUI
      fullScreen={fullScreen}
      closeModal={closeModal}
      form={form}
      onSubmit={onSubmit}
      hasDefaultAccount={hasDefaultAccount}
    />
  );
}
