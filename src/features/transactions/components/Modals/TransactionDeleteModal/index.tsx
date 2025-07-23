import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { DeleteModal } from "@/components/ui/Modals/DeleteModal";
import { useTransactionDeleteMutation } from "@/features/transactions/api/mutations/hooks/useTransactionDeleteMutation";
import { getTransactionsQueryKeys } from "@/features/transactions/api/queries/transactionsQuery";
import { getTransactionQueryKeys } from "@/features/transactions/api/queries/transactionQuery";
import { Route } from "@/routes/_protectedLayout/_transactionsLayout/transactions/list";

interface IProps {
  closeModal: () => void;
  transactionId: string;
}

export function TransactionDeleteModal({ closeModal, transactionId }: IProps) {
  const searchParams = Route.useSearch();
  const transactionDeleteMutation = useTransactionDeleteMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  function handleDelete() {
    transactionDeleteMutation.mutate(
      { transactionId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getTransactionsQueryKeys(searchParams.month),
          });
          queryClient.invalidateQueries({
            queryKey: getTransactionQueryKeys(transactionId),
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
  }
  return (
    <DeleteModal
      isOpen
      closeModal={closeModal}
      title={intl.formatMessage({ id: "Transactions.modals.delete.title" })}
      message={intl.formatMessage({ id: "Transactions.modals.delete.message" })}
      handleDelete={handleDelete}
      isLoading={transactionDeleteMutation.isPending}
    />
  );
}
