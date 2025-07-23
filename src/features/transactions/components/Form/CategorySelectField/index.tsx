import { FormattedMessage } from "react-intl";
import { Controller, type UseFormReturn } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { useQuery } from "@tanstack/react-query";
import type { TTransactionFormFields } from "@/features/transactions/schema";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { categoriesTreeViewQueryOptions } from "@/features/categories/api/queries/categoriesTreeView";
import Chip from "@mui/material/Chip";
import CategoryIcon from "@mui/icons-material/Category";
import { CategoryManageModal } from "@/features/categories/components/Modals/CategoryManageModal";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import type { ISelectedCategory } from "@/features/categories/types";
import type { TreeViewBaseItem } from "@mui/x-tree-view";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

interface IProps {
  form: UseFormReturn<TTransactionFormFields>;
}

export function CategorySelectField({ form }: IProps) {
  const query = useQuery(categoriesTreeViewQueryOptions);
  const [isManageCategoryModalOpen, { open, close }] = useDisclosure();

  function getSelectedCategory(
    id: string | null,
    data: TreeViewBaseItem[]
  ): ISelectedCategory | null {
    if (id && data) {
      let category: ISelectedCategory | null = null;

      data.forEach((parentNode) => {
        if (parentNode.id === id) {
          category = {
            id: parentNode.id,
            name: parentNode.label,
          };
          return;
        }

        parentNode.children?.forEach((childNode) => {
          if (childNode.id === id) {
            category = {
              id: childNode.id,
              name: childNode.label,
              parent: {
                id: parentNode.id,
                name: parentNode.label,
              },
            };
            return;
          }
        });
      });

      if (!category) {
        console.error("Failed to select category; Category not found");
        return null;
      }

      return category;
    }

    return null;
  }

  function displayLabel(
    selectedCategory: ISelectedCategory | null
  ): string | null {
    if (!selectedCategory) {
      return null;
    }
    return selectedCategory.parent
      ? `${selectedCategory.parent.name}:${selectedCategory.name}`
      : selectedCategory.name;
  }

  if (query.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (query.data?.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">
          <FormattedMessage id="Categories.dataList.emptyListMessage" />
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Controller
        name="categoryId"
        control={form.control}
        render={({ field }) => (
          <FormControl error={Boolean(form.formState.errors.payeeId)}>
            <Typography variant="subtitle1">
              <FormattedMessage id="Transactions.form.fields.category.label" />
            </Typography>
            <Chip
              label={
                displayLabel(
                  getSelectedCategory(field.value, query.data ?? [])
                ) ?? (
                  <FormattedMessage id="Transactions.form.fields.category.placeholder" />
                )
              }
              onClick={open}
              color="default"
              icon={<CategoryIcon />}
            />
            <input type="hidden" value={field.value} />
            <FormHelperText error>
              {form.formState.errors.categoryId?.message}
            </FormHelperText>
            {isManageCategoryModalOpen ? (
              <CategoryManageModal
                closeModal={close}
                mode={{
                  type: "select",
                  handleOnSelectCategory: (selectedCategory) => {
                    field.onChange(selectedCategory?.id);
                  },
                }}
              />
            ) : null}
          </FormControl>
        )}
      />
    </>
  );
}
