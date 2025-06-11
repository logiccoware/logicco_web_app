import {
  createFileRoute,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_protectedLayout/_transactionsLayout")({
  validateSearch: z.object({
    month: z.string().optional(),
    transactionType: z.enum(["INCOME", "EXPENSE"]).optional(),
  }),
  search: {
    middlewares: [retainSearchParams(["month", "transactionType"])],
  },
  component: TransactionsLayout,
});

function TransactionsLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
