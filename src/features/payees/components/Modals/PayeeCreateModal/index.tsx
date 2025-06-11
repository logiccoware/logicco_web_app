import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BaseModal } from "@/components/ui/Modals/BaseModal";
import { PayeeFormFields } from "@/features/payees/components/Form/PayeeFormFields";
import { usePayeeForm } from "@/features/payees/api/form/hooks/usePayeeForm";
import type { SubmitHandler } from "react-hook-form";
import type { TPayeeFormValidatedFields } from "@/features/payees/api/schema";
import { usePayeeCreateMutation } from "@/features/payees/api/mutations/hooks/usePayeeCreateMutation";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useQueryClient } from "@tanstack/react-query";
import { getPayeesListQueryKeys } from "@/features/payees/api/queries/payeesListQuery";
import { ModalSubmitButton } from "@/components/ui/Modals/ModalSubmitButton";

interface IProps {
  closeModal: () => void;
}

export function PayeeCreateModal({ closeModal }: IProps) {
  const form = usePayeeForm({
    defaultValues: {
      name: "",
    },
  });
  const payeeCreateMutation = usePayeeCreateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TPayeeFormValidatedFields> = (data) => {
    payeeCreateMutation.mutate(
      {
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({ id: "Payees.notifications.created" }),
          });
          queryClient.invalidateQueries({
            queryKey: getPayeesListQueryKeys(),
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
    <BaseModal isOpen closeModal={closeModal} title={intl.formatMessage({ id: "Payees.modals.select.title" })}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <PayeeFormFields form={form} />
        </DialogContent>
        <DialogActions>
          <ModalSubmitButton />
        </DialogActions>
      </form>
    </BaseModal>
  );
}
