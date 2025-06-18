import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { TPayeeFormValidatedFields } from "@/features/payees/api/schema";
import { useIntl } from "react-intl";

interface IProps {
  form: UseFormReturn<TPayeeFormValidatedFields>;
}

export function PayeeFormFields({ form }: IProps) {
  const intl = useIntl();
  return (
    <Stack gap={2}>
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label={intl.formatMessage({ id: "Payees.form.fields.name.label" })}
            fullWidth
            error={Boolean(form.formState.errors.name)}
            helperText={form.formState.errors.name?.message}
          />
        )}
      />
    </Stack>
  );
}
