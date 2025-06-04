import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { TLoginFormValidatedFields } from "@/features/auth/api/login/forms/schema";

interface IProps {
  form: UseFormReturn<TLoginFormValidatedFields>;
}

export function LoginFormFields({ form }: IProps) {
  return (
    <Stack gap={2}>
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            error={Boolean(form.formState.errors.email)}
            helperText={form.formState.errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            error={Boolean(form.formState.errors.password)}
            helperText={form.formState.errors.password?.message}
          />
        )}
      />
    </Stack>
  );
}
