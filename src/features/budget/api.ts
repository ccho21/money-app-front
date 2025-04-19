// src/features/budget/api.ts

import { get, post, put } from '@/lib/api';
import {
  BudgetCategoryListResponseDTO,
  BudgetSummaryResponseDTO,
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryDTO,
  BudgetGroupItemDTO,
} from './types';
import { DateFilterParams } from '@/features/shared/types';
import { AccountDashboardResponseDTO } from '../account/types';

//
// Fetch budgets grouped by category
//
export const fetchBudgetsByCategoryAPI = (
  params: DateFilterParams
): Promise<BudgetCategoryListResponseDTO> => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get(`/budgets/by-category?${query.toString()}`);
};

//
// Fetch budget summary for a given period
//
export const fetchBudgetSummaryAPI = (
  params: DateFilterParams
): Promise<BudgetSummaryResponseDTO> => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get(`/budgets/summary?${query.toString()}`);
};

//
// Create a new budget category
//
export const createBudgetCategoryAPI = (
  data: CreateBudgetCategoryDTO
): Promise<{ budgetId: string; message: string }> => {
  return post('/budgets/by-category', data);
};

//
// Update an existing budget category
//
export const updateBudgetCategoryAPI = (
  id: string,
  data: UpdateBudgetCategoryDTO
): Promise<{ budgetId: string; message: string }> => {
  return put(`/budgets/by-category/${id}`, data);
};

//
// Fetch budget data grouped by categoryId (for detailed period view)
//
export const getBudgetCategoriesByCategoryIdAPI = (
  categoryId: string,
  data: DateFilterParams
): Promise<BudgetGroupItemDTO> => {
  return post(`/budgets/by-category/${categoryId}`, data);
};

//
// Fetch account dashboard info (for budget sidebar use)
//
export const fetchAccountsDashboardAPI =
  (): Promise<AccountDashboardResponseDTO> => {
    return get('/accounts/dashboard');
  };
