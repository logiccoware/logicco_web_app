import { ProtectedPageContainer } from "@/components/layouts/ProtectedLayout/ProtectedPageContainer";
import { EntityDataList } from "@/components/ui/EntityDataList";
import { toPayeeDataList } from "@/features/payees/api/helpers";
import { payeesListQueryOptions } from "@/features/payees/api/queries/payeesListQuery";
import { PayeeCreateModal } from "@/features/payees/components/Modals/PayeeCreateModal";
import { PayeeDeleteModal } from "@/features/payees/components/Modals/PayeeDeleteModal";
import { PayeeUpdateModal } from "@/features/payees/components/Modals/PayeeUpdateModal";
import { payeeSearchParamsSchema } from "@/features/payees/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";

export const Route = createFileRoute("/_protectedLayout/payees/")({
  validateSearch: payeeSearchParamsSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(payeesListQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(payeesListQueryOptions);
  const payeesDataList = toPayeeDataList(data.payees);
  const intl = useIntl();
  return (
    <ProtectedPageContainer title="Payees">
      <EntityDataList
        data={payeesDataList}
        emptyListMessage={intl.formatMessage({
          id: "Payees.dataList.emptyListMessage",
        })}
        handleItemClick={(payee) => {
          navigate({
            search: () => ({ payeeUpdateModalId: payee.id }),
            replace: true,
          });
        }}
        handleAddClick={() => {
          navigate({
            search: () => ({ isPayeeCreateModalOpen: true }),
            replace: true,
          });
        }}
        handleDeleteClick={(payee) => {
          navigate({
            search: () => ({ payeeDeleteModalId: payee.id }),
            replace: true,
          });
        }}
      />
      {Boolean(searchParams.isPayeeCreateModalOpen) ? (
        <PayeeCreateModal
          closeModal={() => {
            navigate({
              search: () => ({ isPayeeCreateModalOpen: undefined }),
              replace: true,
            });
          }}
        />
      ) : null}
      {searchParams.payeeUpdateModalId ? (
        <PayeeUpdateModal
          payeeId={searchParams.payeeUpdateModalId}
          closeModal={() => {
            navigate({
              search: () => ({ payeeUpdateModalId: undefined }),
              replace: true,
            });
          }}
        />
      ) : null}
      {searchParams.payeeDeleteModalId ? (
        <PayeeDeleteModal
          payeeId={searchParams.payeeDeleteModalId}
          isOpen
          closeModal={() => {
            navigate({
              search: () => ({ payeeDeleteModalId: undefined }),
              replace: true,
            });
          }}
        />
      ) : null}
    </ProtectedPageContainer>
  );
}
