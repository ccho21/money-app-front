// 📄 src/api/category.api.ts

import { del, get, patch, post } from '../../shared/api';
import {
  CategoryDTO,
  CategoryCreateRequestDTO,
  CategoryUpdateRequestDTO,
} from './types';

export const getCategoriesAPI = (): Promise<CategoryDTO[]> => {
  return get('/categories');
};

export const createCategoryAPI = async (data: CategoryCreateRequestDTO) => {
  return post('/categories', data);
};

export const updateCategoryAPI = async (
  id: string,
  data: CategoryUpdateRequestDTO
) => {
  return patch(`/categories/${id}`, data);
};

export const deleteCategoryAPI = async (id: string) => {
  return del(`/categories/${id}`);
};

export const getCategoryByIdAPI = async (id: string): Promise<CategoryDTO> => {
  return get(`/categories/${id}`);
};
