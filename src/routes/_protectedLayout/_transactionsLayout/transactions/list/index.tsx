import { FabAdd } from "@/components/ui/FaButton";
import { transactionsQueryOptions } from "@/features/transactions/api/queries/transactionsQuery";
import { TransactionsList } from "@/features/transactions/components/TransactionsList";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import { z } from "zod";
import { TransactionCreateDialog } from "@/features/transactions/components/Dialogs/TransactionCreateDialog";
import { getGroupedTransactionsByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";
import { TransactionUpdateModal } from "@/features/transactions/components/Modals/TransactionUpdateModal";
import { TransactionDeleteModal } from "@/features/transactions/components/Modals/TransactionDeleteModal";
import { TransactionDateSwitcher } from "@/features/transactions/components/TransactionDateSwitcher";
import { useMonthSwitcher } from "@/lib/hooks/useMonthSwitcher";
import { TransactionCreateDuplicateDialog } from "@/features/transactions/components/Dialogs/TransactionCreateDuplicateDialog";

export const Route = createFileRoute(
  "/_protectedLayout/_transactionsLayout/transactions/list/"
)({
  component: TransactionsListPage,
  validateSearch: z.object({
    isTransactionCreateModalOpen: z.boolean().optional(),
    duplicateTransactionId: z.string().optional(),
    transactionUpdateModalId: z.string().optional(),
    transactionDeleteModalId: z.string().optional(),
  }),
  loaderDeps({ search }) {
    return {
      month: search.month,
    };
  },
  loader: ({ context: { queryClient }, deps: { month } }) =>
    queryClient.ensureQueryData(
      transactionsQueryOptions({
        queryParams: {
          month,
        },
      })
    ),
});

function TransactionsListPage() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(
    transactionsQueryOptions({
      queryParams: {
        month: searchParams.month,
      },
    })
  );
  const { getMonth, monthLabel } = useMonthSwitcher({
    monthQueryParam: searchParams.month,
  });

  return (
    <Box sx={{ mt: 4 }}>
      <TransactionDateSwitcher
        monthLabel={monthLabel}
        rightClick={() =>
          navigate({
            search: () => ({
              month: getMonth("next"),
            }),
          })
        }
        leftClick={() =>
          navigate({
            search: () => ({
              month: getMonth("prev"),
            }),
          })
        }
      />
      <Box sx={{ mb: 4 }}>
        <TransactionsList
          data={getGroupedTransactionsByDate(data.transactions)}
          handleDeleteClick={(id) => {
            navigate({
              search: () => ({
                transactionDeleteModalId: id,
              }),
              replace: true,
            });
          }}
          handleDuplicateClick={(id) => {
            navigate({
              search: () => ({
                isTransactionCreateModalOpen: true,
                duplicateTransactionId: id,
              }),
              replace: true,
            });
          }}
          handleItemClick={(id) => {
            navigate({
              search: () => ({
                transactionUpdateModalId: id,
              }),
              replace: true,
            });
          }}
        />
      </Box>
      {data.account ? (
        <FabAdd
          onClick={() => {
            navigate({
              search: () => ({
                isTransactionCreateModalOpen: true,
              }),
              replace: true,
            });
          }}
        />
      ) : null}
      {data?.account && searchParams.isTransactionCreateModalOpen ? (
        <TransactionCreateDialog
          closeModal={() => {
            navigate({
              search: () => ({
                isTransactionCreateModalOpen: undefined,
              }),
              replace: true,
              resetScroll: false,
            });
          }}
        />
      ) : null}
      {data?.account &&
      searchParams.isTransactionCreateModalOpen &&
      searchParams.duplicateTransactionId ? (
        <TransactionCreateDuplicateDialog
          transactionId={searchParams.duplicateTransactionId}
          closeModal={() => {
            navigate({
              search: () => ({
                isTransactionCreateModalOpen: undefined,
                duplicateTransactionId: undefined,
              }),
              resetScroll: false,
              replace: true,
            });
          }}
        />
      ) : null}
      {data?.account && searchParams.transactionUpdateModalId ? (
        <TransactionUpdateModal
          closeModal={() => {
            navigate({
              search: () => ({
                transactionUpdateModalId: undefined,
              }),
              replace: true,
              resetScroll: false,
            });
          }}
          transactionId={searchParams.transactionUpdateModalId}
        />
      ) : null}
      {data?.account && searchParams.transactionDeleteModalId ? (
        <TransactionDeleteModal
          closeModal={() => {
            navigate({
              search: () => ({
                transactionDeleteModalId: undefined,
              }),
              replace: true,
              resetScroll: false,
            });
          }}
          transactionId={searchParams.transactionDeleteModalId}
        />
      ) : null}
    </Box>
  );
}
