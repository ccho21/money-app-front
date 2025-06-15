'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BudgetCategoryCreateRequest,
  BudgetCategoryListResponse,
  BudgetCategoryUpdateRequest,
  BudgetGroupItem,
  BudgetQuery,
} from '../types/types';
import {
  createBudgetCategoryAPI,
  fetchBudgetByCategoryAPI,
  fetchGroupedBudgetCategoryAPI,
  updateBudgetCategoryAPI,
} from '../api';

const normalizeAmount = (amount: string | number): number =>
  typeof amount === 'string' ? Number(amount) : amount;

export const useBudgetsByCategory = (params: BudgetQuery) =>
  useQuery<BudgetCategoryListResponse>({
    queryKey: ['budgets-by-category', params],
    queryFn: () => fetchBudgetByCategoryAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

export const useGroupedBudgetCategory = (
  categoryId: string,
  filter: BudgetQuery,
  enabled = true
) =>
  useQuery<BudgetGroupItem>({
    queryKey: ['budget-group', categoryId, filter],
    queryFn: () => fetchGroupedBudgetCategoryAPI(categoryId, filter),
    enabled: enabled && !!categoryId && !!filter.startDate && !!filter.endDate,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateBudgetCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BudgetCategoryCreateRequest) => {
      const prepared = { ...input, amount: normalizeAmount(input.amount) };
      return createBudgetCategoryAPI(prepared);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets-by-category'] });
      queryClient.invalidateQueries({ queryKey: ['budget-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budget-group'] });
    },
  });
};

export const useUpdateBudgetCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: BudgetCategoryUpdateRequest;
    }) => updateBudgetCategoryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets-by-category'] });
      queryClient.invalidateQueries({ queryKey: ['budget-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budget-group'] });
    },
  });
};
