import { FormattedMessage } from "react-intl";
import { Controller, type UseFormReturn } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { useQuery } from "@tanstack/react-query";
import { payeesListQueryOptions } from "@/features/payees/api/queries/payeesListQuery";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import FormHelperText from "@mui/material/FormHelperText";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import type { TPayeeEntity } from "@/features/payees/api/schema";
import { PayeeSelectModal } from "@/features/payees/components/Modals/PayeeSelectModal";

interface IProps {
  form: UseFormReturn<TTransactionFormFields>;
  onPayeeChange: (payeeId: string | null) => void;
}

export function PayeeSelectField({ form, onPayeeChange }: IProps) {
  const query = useQuery(payeesListQueryOptions);
  const [isPayeeSelectModalOpen, { open, close }] = useDisclosure();

  const selectedPayee = getSelectedPayee(
    form.watch("payeeId"),
    query.data?.payees ?? []
  );

  function getSelectedPayee(
    id: string | null,
    data: TPayeeEntity[]
  ): TPayeeEntity | null {
    if (id && data) {
      const payee = data.find((payee) => payee.id === id);

      if (!payee) {
        console.error("Failed to select payee; Payee not found");
        return null;
      }

      return payee;
    }

    return null;
  }

  if (query.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (query.data?.payees?.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">
          <FormattedMessage id="Payees.dataList.emptyListMessage" />
        </Alert>
      </Box>
    );
  }

  return (
    <Controller
      name="payeeId"
      control={form.control}
      render={({ field }) => (
        <FormControl error={Boolean(form.formState.errors.payeeId)}>
          <Typography variant="subtitle1">
            <FormattedMessage id="Transactions.form.fields.payees.label" />
          </Typography>
          <Chip
            label={
              selectedPayee?.name ?? (
                <FormattedMessage id="Transactions.form.fields.payees.placeholder" />
              )
            }
            onClick={open}
            color="default"
            icon={<CorporateFareIcon />}
          />
          <input type="hidden" value={field.value} />
          <FormHelperText error>
            {form.formState.errors.payeeId?.message}
          </FormHelperText>
          {isPayeeSelectModalOpen ? (
            <PayeeSelectModal
              closeModal={close}
              handleOnSelectPayee={(payee) => {
                onPayeeChange(payee?.id ?? null);
                field.onChange(payee?.id ?? null);
              }}
              defaultSelectedPayee={selectedPayee}
            />
          ) : null}
        </FormControl>
      )}
    />
  );
}
