import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TRANSACTION_TYPES } from "@/features/transactions/constants";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { PayeeSelectField } from "@/features/transactions/components/Form/PayeeSelectField";
import { CategorySelectField } from "@/features/transactions/components/Form/CategorySelectField";
import { useGetLatestCategoryByPayeeMutation } from "@/features/transactions/api/mutations/hooks/useGetLatestCategoryByPayeeMutation";

interface IProps {
  form: UseFormReturn<TTransactionFormFields>;
}

export function TransactionFormFields({ form }: IProps) {
  const getLatestCategoryByPayeeMutation =
    useGetLatestCategoryByPayeeMutation();
  return (
    <Stack gap={2}>
      <input type="hidden" {...form.register("accountId")} />
      <Controller
        name="date"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth>
            <DatePicker
              defaultValue={dayjs(new Date())}
              value={field.value ? dayjs(field.value) : null}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date?.toString())}
              slotProps={{
                textField: {
                  error: Boolean(form.formState.errors.date),
                  helperText: form.formState.errors.date?.message,
                },
              }}
              label={
                <FormattedMessage id="Transactions.form.fields.date.label" />
              }
            />
          </FormControl>
        )}
      />
      <Controller
        name="amount"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth>
            <NumericFormat
              {...field}
              onChange={undefined}
              onValueChange={({ value }) => field.onChange(value)}
              customInput={TextField}
              thousandSeparator
              valueIsNumericString
              allowNegative={false}
              decimalScale={2}
              prefix="$"
              error={Boolean(form.formState.errors.amount)}
              helperText={form.formState.errors.amount?.message}
              label={
                <FormattedMessage id="Transactions.form.fields.amount.label" />
              }
            />
          </FormControl>
        )}
      />
      <PayeeSelectField
        form={form}
        onPayeeChange={(payeeId) => {
          const accountId = form.getValues("accountId");
          const currentCategoryId = form.getValues("categoryId");
          if (accountId && !currentCategoryId && payeeId) {
            getLatestCategoryByPayeeMutation.mutate(
              {
                payeeId,
                accountId,
              },
              {
                onSuccess: (categoryId) => {
                  if (categoryId) {
                    form.setValue("categoryId", categoryId);
                  }
                },
              }
            );
          }
        }}
      />
      <CategorySelectField form={form} />
      <Controller
        name="type"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>
              <FormattedMessage id="Transactions.form.fields.type.label" />
            </InputLabel>
            <Select
              {...field}
              labelId="currency-label"
              label={
                <FormattedMessage id="Transactions.form.fields.type.label" />
              }
              error={Boolean(form.formState.errors.type)}
            >
              <MenuItem value={TRANSACTION_TYPES.EXPENSE}>
                {TRANSACTION_TYPES.EXPENSE}
              </MenuItem>
              <MenuItem value={TRANSACTION_TYPES.INCOME}>
                {TRANSACTION_TYPES.INCOME}
              </MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="note"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth>
            <TextField
              onChange={field.onChange}
              value={field.value}
              inputRef={field.ref}
              multiline
              rows={2}
              label={
                <FormattedMessage id="Transactions.form.fields.note.label" />
              }
              error={Boolean(form.formState.errors.note)}
            />
          </FormControl>
        )}
      />
    </Stack>
  );
}
