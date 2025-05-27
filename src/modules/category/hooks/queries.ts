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
  CategoryCreateRequestDTO,
  CategoryUpdateRequestDTO,
  CategoryDetailDTO,
} from '../types/types';

// ✅ 1. 전체 카테고리 목록
export const fetchCategories = () =>
  useQuery<CategoryDetailDTO[]>({
    queryKey: ['categories'],
    queryFn: fetchCategoriesAPI,
    staleTime: 1000 * 60 * 5,
  });

// ✅ 2. 단일 카테고리 조회
export const fetchCategoryById = (categoryId: string, enabled = true) =>
  useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategoryByIdAPI(categoryId),
    enabled: enabled && !!categoryId,
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CategoryUpdateRequestDTO;
    }) => updateCategoryAPI(id, data),
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

// ✅ 3. 카테고리 생성
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CategoryCreateRequestDTO) => createCategoryAPI(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
