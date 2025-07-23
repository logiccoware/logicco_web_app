import { transactionQueryOptions } from "@/features/transactions/api/queries/transactionQuery";
import { useQuery } from "@tanstack/react-query";
import { useTransactionCreateDialog } from "@/features/transactions/hooks/useTransactionCreateDialog";
import { TransactionCreateDialogUI } from "@/features/transactions/components/Dialogs/TransactionCreateDialog/shared/TransactionCreateDialogUI";

interface IProps {
  closeModal: () => void;
  transactionId: string;
}

export function TransactionCreateDuplicateDialog({
  closeModal,
  transactionId,
}: IProps) {
  const query = useQuery(transactionQueryOptions(transactionId));

  const { fullScreen, form, onSubmit, hasDefaultAccount } =
    useTransactionCreateDialog({
      closeModal,
      prefilledValues: {
        amount: query.data?.amount ?? "",
        payeeId: query.data?.payee?.id ?? "",
        categoryId: query.data?.category?.id ?? "",
        type: query.data?.type ?? "EXPENSE",
        note: query.data?.note ?? "",
      },
    });

  return (
    <TransactionCreateDialogUI
      fullScreen={fullScreen}
      closeModal={closeModal}
      form={form}
      isError={query.isError}
      isLoading={query.isFetching}
      onSubmit={onSubmit}
      hasDefaultAccount={hasDefaultAccount}
    />
  );
}
