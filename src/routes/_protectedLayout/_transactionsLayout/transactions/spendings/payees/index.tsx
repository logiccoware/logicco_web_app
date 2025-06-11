import { ProtectedPageContainer } from "@/components/layouts/ProtectedLayout/ProtectedPageContainer";
import { payeeSpendingsQueryOptions } from "@/features/spendings/api/queries/payeeSpendings";
import { PayeeSpendingTable } from "@/features/spendings/components/Payee/PayeeSpendingTable";
import { TransactionDateSwitcher } from "@/features/transactions/components/TransactionDateSwitcher";
import { useMonthSwitcher } from "@/lib/hooks/useMonthSwitcher";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PieChart } from "@mui/x-charts/PieChart";
import { getTransactionType } from "@/features/transactions/helpers/getTransactionType";
import { TransactionTypeSwitcher } from "@/features/spendings/components/TransactionTypeSwitcher";
import Box from "@mui/material/Box";
import { SpendingTabs } from "@/features/spendings/components/SpendingTabs";

export const Route = createFileRoute(
  "/_protectedLayout/_transactionsLayout/transactions/spendings/payees/"
)({
  component: RouteComponent,
  loaderDeps({ search }) {
    return {
      month: search.month,
      transactionType: search.transactionType,
    };
  },
  loader: ({ context: { queryClient }, deps: { month, transactionType } }) =>
    queryClient.ensureQueryData(
      payeeSpendingsQueryOptions({
        month,
        transactionType: getTransactionType(transactionType),
      })
    ),
});

function RouteComponent() {
  const searchParams = Route.useSearch({
    select: (search) => ({
      month: search.month,
      transactionType: search.transactionType,
    }),
  });
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(
    payeeSpendingsQueryOptions({
      month: searchParams.month,
      transactionType: getTransactionType(searchParams.transactionType),
    })
  );
  const { getMonth, monthLabel } = useMonthSwitcher({
    monthQueryParam: searchParams.month,
  });
  return (
    <ProtectedPageContainer>
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
      {data.pieChartData.length > 0 ? (
        <PieChart
          series={[
            {
              data: data.pieChartData,
            },
          ]}
          width={200}
          height={200}
        />
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <SpendingTabs />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <TransactionTypeSwitcher
          selectedTransactionType={getTransactionType(
            searchParams.transactionType
          )}
          onTransactionTypeChange={(transactionType) =>
            navigate({
              search: () => ({
                transactionType: getTransactionType(transactionType),
              }),
            })
          }
        />
      </Box>
      <PayeeSpendingTable rows={data.list} />
    </ProtectedPageContainer>
  );
}
