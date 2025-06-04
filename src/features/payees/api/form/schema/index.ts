import { z } from "zod";

export type TPayeeFormValidatedFields = z.infer<typeof payeeFormValidationSchema>;
export const payeeFormValidationSchema = z.object({
  name: z.string().min(1, "Email is required"),
});
