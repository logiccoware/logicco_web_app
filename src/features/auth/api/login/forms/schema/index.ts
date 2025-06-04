import { z } from "zod";

export type TLoginFormValidatedFields = z.infer<typeof loginFormValidationSchema>;
export const loginFormValidationSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
