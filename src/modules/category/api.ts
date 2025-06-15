// 파일: src/modules/category/api.ts

import { del, get, patch, post } from '@/modules/shared/common/api';
import {
  CategoryDetail,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from './types/types';

// Fetch all categories
export const fetchCategoriesAPI = () => {
  return get<CategoryDetail[]>('/categories');
};

// Fetch a single category by ID
export const fetchCategoryByIdAPI = (id: string) => {
  return get<CategoryDetail>(`/categories/${id}`);
};

// Create a new category
export const createCategoryAPI = (payload: CategoryCreateRequest) => {
  return post<CategoryDetail, CategoryCreateRequest>(
    '/categories',
    payload
  );
};

// Update an existing category
export const updateCategoryAPI = (
  id: string,
  payload: CategoryUpdateRequest
) => {
  return patch<CategoryDetail, CategoryUpdateRequest>(
    `/categories/${id}`,
    payload
  );
};

// Delete a category
export const deleteCategoryAPI = (id: string) => {
  return del<void>(`/categories/${id}`);
};
