import { z } from "zod";

export const payeeSearchParamsSchema = z.object({
  isPayeeCreateModalOpen: z.boolean().optional(),
  payeeUpdateModalId: z.string().optional(),
  payeeDeleteModalId: z.string().optional(),
});
