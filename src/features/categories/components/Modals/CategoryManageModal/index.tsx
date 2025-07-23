import { useQuery } from "@tanstack/react-query";
import { foldQuery } from "@/lib/helpers/foldQuery";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { FormattedMessage, useIntl } from "react-intl";
import { categoriesTreeViewQueryOptions } from "@/features/categories/api/queries/categoriesTreeView";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import type { ISelectedCategory } from "@/features/categories/types";
import { CategoryCreateModal } from "@/features/categories/components/Modals/CategoryCreateModal";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CategoryUpdateModal } from "@/features/categories/components/Modals/CategoryUpdateModal";
import { CategoryDeleteModal } from "@/features/categories/components/Modals/CategoryDeleteModal";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

interface IProps {
  closeModal: () => void;
  defaultSelectedCategoryId?: string | null;
  mode?:
    | {
        type: "manage";
      }
    | {
        type: "select";
        handleOnSelectCategory: (category: ISelectedCategory | null) => void;
      };
}

export function CategoryManageModal({
  closeModal,
  mode = { type: "manage" },
}: IProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ISelectedCategory | null>(null);

  const [
    isCategoryCreateModalOpen,
    { open: openCategoryCreateModal, close: closeCategoryCreateModal },
  ] = useDisclosure();
  const [
    isCategoryUpdateModalOpen,
    { open: openCategoryUpdateModal, close: closeCategoryUpdateModal },
  ] = useDisclosure();
  const [
    isCategoryDeleteModalOpen,
    { open: openCategoryDeleteModal, close: closeCategoryDeleteModal },
  ] = useDisclosure();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const intl = useIntl();
  const query = useQuery(categoriesTreeViewQueryOptions);

  function resetSelectedCategory() {
    setSelectedCategory(null);
  }

  const handleSelectedItemChange = (
    _event: React.SyntheticEvent | null,
    id: string | null
  ) => {
    if (id) {
      if (id === selectedCategory?.id) {
        resetSelectedCategory();
      } else {
        const selected = getSelectedCategory(id);
        setSelectedCategory(selected);
      }
    } else {
      resetSelectedCategory();
    }
  };

  function getSelectedCategory(id: string | null): ISelectedCategory | null {
    if (id && query.data) {
      let category: ISelectedCategory | null = null;
      const categoriesTreeView = query.data;

      categoriesTreeView.forEach((parentNode) => {
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

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth={fullScreen ? undefined : "sm"}
      open
      onClose={closeModal}
      scroll="paper"
    >
      <>
        {isCategoryCreateModalOpen ? (
          <CategoryCreateModal
            category={selectedCategory}
            closeModal={closeCategoryCreateModal}
          />
        ) : null}
        {isCategoryUpdateModalOpen && selectedCategory ? (
          <CategoryUpdateModal
            closeModal={closeCategoryUpdateModal}
            category={selectedCategory}
          />
        ) : null}
        {isCategoryDeleteModalOpen && selectedCategory ? (
          <CategoryDeleteModal
            closeModal={closeCategoryDeleteModal}
            categoryId={selectedCategory.id}
            resetSelectedCategory={resetSelectedCategory}
          />
        ) : null}
        <Stack sx={{ mx: 2 }} direction="row" justifyContent="space-between">
          <DialogTitle>
            {intl.formatMessage({ id: "Categories.modals.manage.title" })}
          </DialogTitle>
          <ButtonGroup variant="outlined" size="small">
            <IconButton
              disableRipple
              disabled={Boolean(selectedCategory?.parent)}
              onClick={openCategoryCreateModal}
            >
              <AddIcon />
            </IconButton>
            {mode.type === "manage" ? (
              <>
                <IconButton
                  onClick={openCategoryUpdateModal}
                  disableRipple
                  disabled={!selectedCategory}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={openCategoryDeleteModal}
                  disableRipple
                  disabled={!selectedCategory}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            ) : null}
          </ButtonGroup>
        </Stack>

        <DialogContent sx={{ minHeight: 300 }} dividers>
          {foldQuery(query, {
            loadingComponent: () => <ModalContentLoading />,
            successComponent: (data) => {
              if (data && data.length > 0) {
                return (
                  <RichTreeView
                    checkboxSelection
                    items={data}
                    onSelectedItemsChange={handleSelectedItemChange}
                    multiSelect={false}
                  />
                );
              }
              return (
                <ModalContentMessage type="info">
                  <FormattedMessage id="Categories.dataList.emptyListMessage" />
                </ModalContentMessage>
              );
            },
            errorComponent: () => (
              <ModalContentMessage type="error">
                <FormattedMessage id="Common.genericErrorMessage" />
              </ModalContentMessage>
            ),
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>
            <FormattedMessage id="Common.forms.cancelButton" />
          </Button>
          {mode.type === "select" ? (
            <Button
              disabled={Boolean(
                query.isLoading ||
                  query.isError ||
                  !query.data ||
                  !selectedCategory
              )}
              onClick={() => {
                mode.handleOnSelectCategory(selectedCategory);
                closeModal();
              }}
            >
              <FormattedMessage id="Common.modals.entitySelect.cta.select" />
            </Button>
          ) : null}
        </DialogActions>
      </>
    </Dialog>
  );
}
