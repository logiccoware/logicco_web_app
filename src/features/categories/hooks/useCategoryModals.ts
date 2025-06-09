import { useState } from "react";

export function useCategoryModals() {
  const [isCategoryManageModalOpen, setIsCategoryManageModalOpen] =
    useState(false);

  const [isCategoryCreateModalOpen, setIsCategoryCreateModalOpen] =
    useState(false);

  const [isCategoryUpdateModalOpen, setIsCategoryUpdateModalOpen] =
    useState(false);

  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] =
    useState(false);

  function openCategoryDeleteModal() {
    setIsCategoryDeleteModalOpen(true);
  }

  function closeCategoryDeleteModal() {
    setIsCategoryDeleteModalOpen(false);
  }

  function openCategoryUpdateModal() {
    setIsCategoryUpdateModalOpen(true);
  }
  function closeCategoryUpdateModal() {
    setIsCategoryUpdateModalOpen(false);
  }

  function openCategoryCreateModal() {
    setIsCategoryCreateModalOpen(true);
  }

  function closeCategoryCreateModal() {
    setIsCategoryCreateModalOpen(false);
  }

  function openCategoryManageModal() {
    setIsCategoryManageModalOpen(true);
  }
  function closeCategoryManageModal() {
    setIsCategoryManageModalOpen(false);
  }

  return {
    isCategoryManageModalOpen,
    openCategoryManageModal,
    closeCategoryManageModal,
    isCategoryCreateModalOpen,
    openCategoryCreateModal,
    closeCategoryCreateModal,
    isCategoryUpdateModalOpen,
    openCategoryUpdateModal,
    closeCategoryUpdateModal,
    isCategoryDeleteModalOpen,
    openCategoryDeleteModal,
    closeCategoryDeleteModal,
  };
}
