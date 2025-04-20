// 파일: src/modules/category/hooks.ts

import {
  fetchCategoriesAPI,
  fetchCategoryByIdAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from './api';
import { CategoryCreateRequestDTO, CategoryUpdateRequestDTO } from './types';
import { useCategoryStore } from './store';
import { useCategoryFormStore } from './formStore';

// Fetch all categories and update store
export const fetchCategories = async () => {
  try {
    const data = await fetchCategoriesAPI();
    useCategoryStore.getState().setCategories(data);
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Failed to fetch categories'
    );
  }
};

// Create a new category and refresh list
export const createCategory = async (input: CategoryCreateRequestDTO) => {
  try {
    await createCategoryAPI(input);
    await fetchCategories();
    useCategoryFormStore.getState().reset(); // ✅ 구조 문서 기반이므로 유지
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Failed to create category'
    );
    throw err;
  }
};

// Update existing category
export const updateCategory = async (
  id: string,
  input: CategoryUpdateRequestDTO
) => {
  try {
    await updateCategoryAPI(id, input);
    await fetchCategories();
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Failed to update category'
    );
    throw err;
  }
};

// Delete a category
export const deleteCategory = async (id: string) => {
  try {
    await deleteCategoryAPI(id);
    await fetchCategories();
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Failed to delete category'
    );
  }
};

// Fetch single category and fill form
export const fillCategoryForm = async (id: string) => {
  try {
    const data = await fetchCategoryByIdAPI(id);
    useCategoryFormStore.getState().setAllFields(data);
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Failed to fetch category'
    );
  }
};
