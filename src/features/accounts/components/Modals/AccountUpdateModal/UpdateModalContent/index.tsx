import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import type { SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useQueryClient } from "@tanstack/react-query";
import { ModalSubmitButton } from "@/components/ui/Modals/ModalSubmitButton";
import type {
  TAccountEntity,
  TAccountFormFields,
} from "@/features/accounts/schema";
import { useAccountForm } from "@/features/accounts/hooks/useAccountForm";
import { useAccountUpdateMutation } from "@/features/accounts/api/mutations/hooks/useAccountUpdateMutation";
import { getAccountsQueryKeys } from "@/features/accounts/api/queries/accountsQuery";
import { getAccountQueryKeys } from "@/features/accounts/api/queries/accountQuery";
import { AccountFormFields } from "@/features/accounts/components/Form/AccountFormFields";

interface IProps {
  closeModal: () => void;
  account: TAccountEntity;
  accountDefaultId?: string | null;
}

export function UpdateModalContent({
  closeModal,
  account,
  accountDefaultId,
}: IProps) {
  const form = useAccountForm({
    defaultValues: {
      name: account.name,
      currency: account.currency,
      markDefault: accountDefaultId === account.id,
    },
  });
  const accountUpdateMutation = useAccountUpdateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TAccountFormFields> = (data) => {
    accountUpdateMutation.mutate(
      {
        accountId: account.id,
        payload: {
          name: data.name,
          currency: data.currency,
          markDefault: data.markDefault,
        },
      },
      {
        onSuccess: () => {
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({
              id: "Accounts.notifications.updated",
            }),
          });
          queryClient.invalidateQueries({
            queryKey: getAccountsQueryKeys(),
          });
          queryClient.invalidateQueries({
            queryKey: getAccountQueryKeys(account.id),
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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <AccountFormFields form={form} />
      </DialogContent>
      <DialogActions>
        <ModalSubmitButton />
      </DialogActions>
    </form>
  );
}
