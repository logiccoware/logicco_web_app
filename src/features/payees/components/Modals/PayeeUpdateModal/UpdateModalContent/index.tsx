import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PayeeFormFields } from "@/features/payees/components/Form/PayeeFormFields";
import { usePayeeForm } from "@/features/payees/api/form/hooks/usePayeeForm";
import type { SubmitHandler } from "react-hook-form";
import type {
  TPayeeEntity,
  TPayeeFormValidatedFields,
} from "@/features/payees/api/schema";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useQueryClient } from "@tanstack/react-query";
import { usePayeeUpdateMutation } from "@/features/payees/api/mutations/hooks/usePayeeUpdateMutation";
import { getPayeesListQueryKeys } from "@/features/payees/api/queries/payeesListQuery";
import { getPayeeQueryKeys } from "@/features/payees/api/queries/payeeQuery";
import { ModalSubmitButton } from "@/components/ui/Modals/ModalSubmitButton";

interface IProps {
  closeModal: () => void;
  payee: TPayeeEntity;
}

export function UpdateModalContent({ closeModal, payee }: IProps) {
  const form = usePayeeForm({
    defaultValues: {
      name: payee.name,
    },
  });
  const payeeUpdateMutation = usePayeeUpdateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TPayeeFormValidatedFields> = (data) => {
    payeeUpdateMutation.mutate(
      {
        payeeId: payee.id,
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          enqueueSnackbar({
            variant: "success",
            message: intl.formatMessage({ id: "Payees.notifications.updated" }),
          });
          queryClient.invalidateQueries({
            queryKey: getPayeesListQueryKeys(),
          });
          queryClient.invalidateQueries({
            queryKey: getPayeeQueryKeys(payee.id),
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
        <PayeeFormFields form={form} />
      </DialogContent>
      <DialogActions>
        <ModalSubmitButton />
      </DialogActions>
    </form>
  );
}
