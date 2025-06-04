import { usePayeeDeleteMutation } from "@/features/payees/api/mutations/hooks/usePayeeDeleteMutation";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { getPayeesListQueryKeys } from "@/features/payees/api/queries/payeesListQuery";
import { getPayeeQueryKeys } from "@/features/payees/api/queries/payeeQuery";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { DeleteModal } from "@/components/ui/Modals/DeleteModal";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  payeeId: string;
}

export function PayeeDeleteModal({
  isOpen = false,
  closeModal,
  payeeId,
}: IProps) {
  const payeeDeleteMutation = usePayeeDeleteMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  function handleDelete() {
    payeeDeleteMutation.mutate(
      { payeeId },
      {
        onSuccess: () => {
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({ id: "Payees.notifications.deleted" }),
          });
          queryClient.invalidateQueries({
            queryKey: getPayeesListQueryKeys(),
          });
          queryClient.invalidateQueries({
            queryKey: getPayeeQueryKeys(payeeId),
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
      isOpen={isOpen}
      closeModal={closeModal}
      title={intl.formatMessage({ id: "Payees.modals.delete.title" })}
      message={intl.formatMessage({ id: "Payees.modals.delete.message" })}
      handleDelete={handleDelete}
      isLoading={payeeDeleteMutation.isPending}
    />
  );
}
