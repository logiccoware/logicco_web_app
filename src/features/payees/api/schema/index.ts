import { z } from "zod";

export type TPayeeEntity = z.infer<typeof PayeeEntitySchema>;
export const PayeeEntitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type TGetPayees = z.infer<typeof GetPayeesSchema>;
export const GetPayeesSchema = z.object({
  payees: z.array(PayeeEntitySchema),
});

export type TGetPayee = z.infer<typeof GetPayeeSchema>;
export const GetPayeeSchema = z.object({
  payee: PayeeEntitySchema,
});

export type TPayeeFormValidatedFields = z.infer<
  typeof PayeeFormValidationSchema
>;
export const PayeeFormValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
