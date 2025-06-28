import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { TAccountFormFields } from "@/features/accounts/schema";
import { useIntl } from "react-intl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CURRENCIES } from "@/features/accounts/constants";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IProps {
  form: UseFormReturn<TAccountFormFields>;
}

export function AccountFormFields({ form }: IProps) {
  const intl = useIntl();
  return (
    <Stack gap={2}>
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label={intl.formatMessage({
              id: "Accounts.form.fields.name.label",
            })}
            fullWidth
            error={Boolean(form.formState.errors.name)}
            helperText={form.formState.errors.name?.message}
          />
        )}
      />
      <Controller
        name="currency"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="currency-label">
              {intl.formatMessage({
                id: "Accounts.form.fields.currency.label",
              })}
            </InputLabel>
            <Select
              {...field}
              labelId="currency-label"
              label={intl.formatMessage({
                id: "Accounts.form.fields.currency.label",
              })}
              error={Boolean(form.formState.errors.currency)}
            >
              {CURRENCIES.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="markDefault"
        control={form.control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={intl.formatMessage({
              id: "Accounts.form.fields.markDefault.label",
            })}
          />
        )}
      />
    </Stack>
  );
}
