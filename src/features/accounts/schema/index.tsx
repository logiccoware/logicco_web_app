import { z } from "zod";

export type TCurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export const CurrencyCodeSchema = z.enum(["USD", "INR", "CAD"], {
  message: "Invalid currency code",
});

export type TAccountEntity = z.infer<typeof AccountEntitySchema>;
export const AccountEntitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  currency: CurrencyCodeSchema,
});

export type TAccountDefaultCookie = z.infer<typeof AccountDefaultCookieSchema>;
export const AccountDefaultCookieSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  currency: CurrencyCodeSchema,
});

export type TGetAccounts = z.infer<typeof GetAccountsSchema>;
export const GetAccountsSchema = z.object({
  accounts: z.array(AccountEntitySchema),
});

export type TGetAccount = z.infer<typeof GetAccountSchema>;
export const GetAccountSchema = z.object({
  account: AccountEntitySchema,
});

export type TAccountFormFields = z.infer<
  typeof AccountFormValidationFieldsSchema
>;
export const AccountFormValidationFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  currency: CurrencyCodeSchema,
  markDefault: z.boolean().optional(),
  
});

export const accountCrudSearchParamsSchema = z.object({
  isAccountCreateModalOpen: z.boolean().optional(),
  accountUpdateModalId: z.string().optional(),
  accountDeleteModalId: z.string().optional(),
});
