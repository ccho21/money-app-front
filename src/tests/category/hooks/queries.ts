'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCategoriesAPI,
  fetchCategoryByIdAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from '../api';
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
  CategoryDetail,
} from '../types/types';

// ✅
export const useCategories = () =>
  useQuery<CategoryDetail[]>({
    queryKey: ['categories'],
    queryFn: fetchCategoriesAPI,
    staleTime: 1000 * 60 * 5,
  });

// ✅
export const useCategoryById = (categoryId: string, enabled = true) =>
  useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategoryByIdAPI(categoryId),
    enabled: enabled && !!categoryId,
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryUpdateRequest }) =>
      updateCategoryAPI(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryAPI(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });
    },
  });
};

// ✅
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CategoryCreateRequest) => createCategoryAPI(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
