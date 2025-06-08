'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryListResponseDTO,
  BudgetCategoryUpdateRequestDTO,
  BudgetGroupItemDTO,
  BudgetQuery,
  BudgetSummaryDTO,
} from '../types/types';
import {
  createBudgetCategoryAPI,
  fetchBudgetByCategoryAPI,
  fetchBudgetSummaryAPI,
  fetchGroupedBudgetCategoryAPI,
  updateBudgetCategoryAPI,
} from '../api';

const normalizeAmount = (amount: string | number): number =>
  typeof amount === 'string' ? Number(amount) : amount;

export const fetchBudgetsByCategory = (params: BudgetQuery) =>
  useQuery<BudgetCategoryListResponseDTO>({
    queryKey: ['budgets-by-category', params],
    queryFn: () => fetchBudgetByCategoryAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

export const fetchGroupedBudgetCategory = (
  categoryId: string,
  filter: BudgetQuery,
  enabled = true
) =>
  useQuery<BudgetGroupItemDTO>({
    queryKey: ['budget-group', categoryId, filter],
    queryFn: () => fetchGroupedBudgetCategoryAPI(categoryId, filter),
    enabled: enabled && !!categoryId && !!filter.startDate && !!filter.endDate,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateBudgetCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BudgetCategoryCreateRequestDTO) => {
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
      data: BudgetCategoryUpdateRequestDTO;
    }) => updateBudgetCategoryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets-by-category'] });
      queryClient.invalidateQueries({ queryKey: ['budget-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budget-group'] });
    },
  });
};
