import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormValidationSchema,
  type TLoginFormValidatedFields,
} from "@/features/auth/api/login/forms/schema";

export function useLoginForm(): UseFormReturn<TLoginFormValidatedFields> {
  return useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormValidationSchema),
  });
}
