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
import { useCategoryCreateMutation } from "@/features/categories/api/mutations/hooks/useCategoryCreateMutation";
import { getCategoriesTreeViewQueryKey } from "@/features/categories/api/queries/categoriesTreeView";
import { CategoryFormFields } from "@/features/categories/components/Forms/CategoryFormFields";
import type { ISelectedCategory } from "@/features/categories/types";

interface IProps {
  closeModal: () => void;
  category?: ISelectedCategory | null;
}

export function CategoryCreateModal({ closeModal, category }: IProps) {
  const form = useCategoryForm({
    defaultValues: {
      name: "",
    },
  });
  const categoryCreateMutation = useCategoryCreateMutation();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TCategoyFormFields> = (data) => {
    categoryCreateMutation.mutate(
      {
        rootCategoryId: category?.id,
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
        id: intl.formatMessage({ id: "Categories.modals.create.title" }),
      })}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <CategoryFormFields
            rootCategoryName={
              category && !category.parent ? category.name : undefined
            }
            form={form}
          />
        </DialogContent>
        <DialogActions>
          <ModalSubmitButton />
        </DialogActions>
      </form>
    </BaseModal>
  );
}
