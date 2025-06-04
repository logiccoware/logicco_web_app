import { Route } from "@/routes/_protectedLayout/payees";

export function usePayeeModals() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const isPayeeCreateModalOpen = Boolean(searchParams?.isPayeeCreateModalOpen);
  const payeeUpdateModalId = searchParams?.payeeUpdateModalId;
  const payeeDeleteModalId = searchParams?.payeeDeleteModalId;

  const closePayeeCreateModal = () => {
    navigate({
      search: () => ({ isPayeeCreateModalOpen: undefined }),
      replace: true,
    });
  };

  function openPayeeCreateModal() {
    navigate({
      search: () => ({ isPayeeCreateModalOpen: true }),
      replace: true,
    });
  }

  return {
    isPayeeCreateModalOpen,
    payeeUpdateModalId,
    payeeDeleteModalId,
    closePayeeCreateModal,
    openPayeeCreateModal,
  };
}
