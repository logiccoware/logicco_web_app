import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BaseModal } from "@/components/ui/Modals/BaseModal";
import type { SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useQueryClient } from "@tanstack/react-query";
import { ModalSubmitButton } from "@/components/ui/Modals/ModalSubmitButton";
import { useCategoryForm } from "@/features/categories/hooks/useCategoryForm";
import type { TCategoyFormFields } from "@/features/categories/schema";
import { getCategoriesTreeViewQueryKey } from "@/features/categories/api/queries/categoriesTreeView";
import { CategoryFormFields } from "@/features/categories/components/Forms/CategoryFormFields";
import type { ISelectedCategory } from "@/features/categories/types";
import { useCategoryUpdateMutation } from "@/features/categories/api/mutations/hooks/useCategoryUpdateMutation";

interface IProps {
  closeModal: () => void;
  category: ISelectedCategory;
}

export function CategoryUpdateModal({ closeModal, category }: IProps) {
  const form = useCategoryForm({
    defaultValues: {
      name: category.name,
    },
  });
  const categoryUpdateMutation = useCategoryUpdateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TCategoyFormFields> = (data) => {
    categoryUpdateMutation.mutate(
      {
        categoryId: category.id,
        payload: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
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
  };

  return (
    <BaseModal
      isOpen
      closeModal={closeModal}
      title={intl.formatMessage({
        id: intl.formatMessage({ id: "Categories.modals.update.title" }),
      })}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <CategoryFormFields form={form} />
        </DialogContent>
        <DialogActions>
          <ModalSubmitButton />
        </DialogActions>
      </form>
    </BaseModal>
  );
}
