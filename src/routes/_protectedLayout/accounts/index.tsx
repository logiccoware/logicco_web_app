import { ProtectedPageContainer } from "@/components/layouts/ProtectedLayout/ProtectedPageContainer";
import { EntityDataList } from "@/components/ui/EntityDataList";
import { toAccountsDataList } from "@/features/accounts/helpers/toAccountsDataList";
import { accountsQueryOptions } from "@/features/accounts/api/queries/accountsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { accountCrudSearchParamsSchema } from "@/features/accounts/schema";
import { AccountCreateModal } from "@/features/accounts/components/Modals/AccountCreateModal";
import { useAccountDefaultCookie } from "@/features/accounts/hooks/useAccountDefaultCookie";
import { AccountUpdateModal } from "@/features/accounts/components/Modals/AccountUpdateModal";
import { AccountDeleteModal } from "@/features/accounts/components/Modals/AccountDeleteModal";

export const Route = createFileRoute("/_protectedLayout/accounts/")({
  validateSearch: accountCrudSearchParamsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { accountDefaultCookie } = useAccountDefaultCookie();
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(accountsQueryOptions);
  const accountsDataList = toAccountsDataList(
    data.accounts,
    accountDefaultCookie?.id
  );

  const intl = useIntl();
  return (
    <ProtectedPageContainer title="Accounts">
      <EntityDataList
        data={accountsDataList}
        emptyListMessage={intl.formatMessage({
          id: "Accounts.dataList.emptyListMessage",
        })}
        handleItemClick={(account) => {
          navigate({
            search: () => ({ accountUpdateModalId: account.id }),
            replace: true,
          });
        }}
        handleAddClick={() => {
          navigate({
            search: () => ({ isAccountCreateModalOpen: true }),
            replace: true,
          });
        }}
        handleDeleteClick={(account) => {
          navigate({
            search: () => ({ accountDeleteModalId: account.id }),
            replace: true,
          });
        }}
      />
      {Boolean(searchParams.isAccountCreateModalOpen) ? (
        <AccountCreateModal
          isOpen
          closeModal={() => {
            navigate({
              search: () => ({ isAccountCreateModalOpen: undefined }),
              replace: true,
            });
          }}
        />
      ) : null}
      {searchParams.accountUpdateModalId ? (
        <AccountUpdateModal
          isOpen
          closeModal={() => {
            navigate({
              search: () => ({ accountUpdateModalId: undefined }),
              replace: true,
            });
          }}
          accountId={searchParams.accountUpdateModalId}
        />
      ) : null}
      {searchParams.accountDeleteModalId ? (
        <AccountDeleteModal
          isOpen
          closeModal={() => {
            navigate({
              search: () => ({ accountDeleteModalId: undefined }),
              replace: true,
            });
          }}
          accountId={searchParams.accountDeleteModalId}
        />
      ) : null}
    </ProtectedPageContainer>
  );
}
