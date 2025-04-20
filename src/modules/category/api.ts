// 파일: src/modules/category/api.ts

import { del, get, patch, post } from '@/common/api';
import {
  CategoryDetailDTO,
  CategoryCreateRequestDTO,
  CategoryUpdateRequestDTO,
} from './types';

// Fetch all categories
export const fetchCategoriesAPI = () => {
  return get<CategoryDetailDTO[]>('/categories');
};

// Fetch a single category by ID
export const fetchCategoryByIdAPI = (id: string) => {
  return get<CategoryDetailDTO>(`/categories/${id}`);
};

// Create a new category
export const createCategoryAPI = (payload: CategoryCreateRequestDTO) => {
  return post<CategoryDetailDTO, CategoryCreateRequestDTO>(
    '/categories',
    payload
  );
};

// Update an existing category
export const updateCategoryAPI = (
  id: string,
  payload: CategoryUpdateRequestDTO
) => {
  return patch<CategoryDetailDTO, CategoryUpdateRequestDTO>(
    `/categories/${id}`,
    payload
  );
};

// Delete a category
export const deleteCategoryAPI = (id: string) => {
  return del<void>(`/categories/${id}`);
};
