import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { useIntl } from "react-intl";
import type { TCategoyFormFields } from "@/features/categories/schema";

interface IProps {
  form: UseFormReturn<TCategoyFormFields>;
  rootCategoryName?: string;
}

export function CategoryFormFields({ form, rootCategoryName }: IProps) {
  const intl = useIntl();
  return (
    <Stack gap={2}>
      {rootCategoryName ? (
        <TextField
          label={intl.formatMessage({
            id: "Categories.form.fields.parentCategory.label",
          })}
          value={rootCategoryName}
          fullWidth
          disabled
        />
      ) : null}
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label={intl.formatMessage({
              id: "Categories.form.fields.name.label",
            })}
            fullWidth
            error={Boolean(form.formState.errors.name)}
            helperText={form.formState.errors.name?.message}
          />
        )}
      />
    </Stack>
  );
}
