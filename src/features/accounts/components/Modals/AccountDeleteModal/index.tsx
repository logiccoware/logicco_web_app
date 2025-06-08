import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { DeleteModal } from "@/components/ui/Modals/DeleteModal";
import { useAccountDeleteMutation } from "@/features/accounts/api/mutations/hooks/useAccountDeleteMutation";
import { getAccountsQueryKeys } from "@/features/accounts/api/queries/accountsQuery";
import { getAccountQueryKeys } from "@/features/accounts/api/queries/accountQuery";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  accountId: string;
}

export function AccountDeleteModal({
  isOpen = false,
  closeModal,
  accountId,
}: IProps) {
  const accountDeleteMutation = useAccountDeleteMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  function handleDelete() {
    accountDeleteMutation.mutate(
      { accountId },
      {
        onSuccess: () => {
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({ id: "Accounts.notifications.deleted" }),
          });
          queryClient.invalidateQueries({
            queryKey: getAccountsQueryKeys(),
          });
          queryClient.invalidateQueries({
            queryKey: getAccountQueryKeys(accountId),
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
      title={intl.formatMessage({ id: "Accounts.modals.delete.title" })}
      message={intl.formatMessage({ id: "Accounts.modals.delete.message" })}
      handleDelete={handleDelete}
      isLoading={accountDeleteMutation.isPending}
    />
  );
}
