import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BaseModal } from "@/components/ui/Modals/BaseModal";
import type { SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useQueryClient } from "@tanstack/react-query";
import { ModalSubmitButton } from "@/components/ui/Modals/ModalSubmitButton";
import { useAccountCreateMutation } from "@/features/accounts/api/mutations/hooks/useAccountCreateMutation";
import type { TAccountFormFields } from "@/features/accounts/schema";
import { getAccountsQueryKeys } from "@/features/accounts/api/queries/accountsQuery";
import { useAccountForm } from "@/features/accounts/hooks/useAccountForm";
import { AccountFormFields } from "@/features/accounts/components/Form/AccountFormFields";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
}

export function AccountCreateModal({ isOpen = false, closeModal }: IProps) {
  const form = useAccountForm({
    defaultValues: {
      name: "",
      currency: "CAD",
      markDefault: false,
    },
  });
  const accountCreateMutation = useAccountCreateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TAccountFormFields> = (data) => {
    accountCreateMutation.mutate(
      {
        payload: {
          name: data.name,
          currency: data.currency,
          markDefault: data.markDefault ?? false,
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
            queryKey: getAccountsQueryKeys(),
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
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      title={intl.formatMessage({
        id: intl.formatMessage({ id: "Accounts.modals.create.title" }),
      })}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <AccountFormFields form={form} />
        </DialogContent>
        <DialogActions>
          <ModalSubmitButton />
        </DialogActions>
      </form>
    </BaseModal>
  );
}
