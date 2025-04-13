// 📄 src/api/category.api.ts

import { del, get, patch, post } from '../../lib/api';
import { Category, CreateCategoryInput, UpdateCategoryInput } from './types';

export const getCategoriesAPI = (): Promise<Category[]> => {
  return get('/categories');
};

export const createCategoryAPI = async (data: CreateCategoryInput) => {
  return post('/categories', data);
};

export const updateCategoryAPI = async (
  id: string,
  data: UpdateCategoryInput
) => {
  return patch(`/categories/${id}`, data);
};

export const deleteCategoryAPI = async (id: string) => {
  return del(`/categories/${id}`);
};

export const getCategoryByIdAPI = async (id: string): Promise<Category> => {
  return get(`/categories/${id}`);
};
