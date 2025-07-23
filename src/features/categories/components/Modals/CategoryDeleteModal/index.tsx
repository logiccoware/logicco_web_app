import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { DeleteModal } from "@/components/ui/Modals/DeleteModal";
import { useCategoryDeleteMutation } from "@/features/categories/api/mutations/hooks/useCategoryDeleteMutation";
import { getCategoriesTreeViewQueryKey } from "@/features/categories/api/queries/categoriesTreeView";

interface IProps {
  closeModal: () => void;
  categoryId: string;
  resetSelectedCategory: () => void;
}

export function CategoryDeleteModal({
  closeModal,
  categoryId,
  resetSelectedCategory,
}: IProps) {
  const categoryDeleteMutation = useCategoryDeleteMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  function handleDelete() {
    categoryDeleteMutation.mutate(
      { categoryId },
      {
        onSuccess: () => {
          resetSelectedCategory();
          queryClient.invalidateQueries({
            queryKey: getCategoriesTreeViewQueryKey(),
          });
          closeModal();
        },
        onError: () => {
          enqueueSnackbar({
            variant: "error",
            autoHideDuration: 1500,
            message: intl.formatMessage({
              id: DEFAULT_SNACKBAR_ERROR_MESSAGE_ID,
            }),
          });
        },
      }
    );
  }
  return (
    <DeleteModal
      isOpen
      closeModal={closeModal}
      title={intl.formatMessage({ id: "Categories.modals.delete.title" })}
      message={intl.formatMessage({ id: "Categories.modals.delete.message" })}
      handleDelete={handleDelete}
      isLoading={categoryDeleteMutation.isPending}
    />
  );
}
