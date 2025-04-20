// 파일: src/modules/budget/api.ts

import { get, post, patch, del } from '@/common/api';
import { buildQuery } from '@/shared/util/buildQuery';
import {
  BudgetCategoryItemDTO,
  BudgetCategoryPeriodItemDTO,
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryUpdateRequestDTO,
} from './types';
import type { DateFilterParams } from '@/common/types';

// Fetch current budget results per category
export const fetchBudgetCategoriesAPI = (params: DateFilterParams) => {
  const query = buildQuery(params);
  return get<BudgetCategoryPeriodItemDTO[]>(`/budgets?${query}`);
};

// Fetch configured budget settings
export const fetchBudgetSettingsAPI = () => {
  return get<BudgetCategoryItemDTO[]>(`/budgets/settings`);
};

// Create new budget config
export const createBudgetCategoryAPI = (
  payload: BudgetCategoryCreateRequestDTO
) => {
  return post<BudgetCategoryItemDTO, BudgetCategoryCreateRequestDTO>(
    '/budgets',
    payload
  );
};

// Update budget config
export const updateBudgetCategoryAPI = (
  id: string,
  payload: BudgetCategoryUpdateRequestDTO
) => {
  return patch<BudgetCategoryItemDTO, BudgetCategoryUpdateRequestDTO>(
    `/budgets/${id}`,
    payload
  );
};

// Delete budget config
export const deleteBudgetCategoryAPI = (id: string) => {
  return del<void>(`/budgets/${id}`);
};
