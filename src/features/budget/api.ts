import { get, post, put } from '@/features/shared/api';
import {
  BudgetCategoryGroupResponse,
  BudgetCategoryResponse,
  BudgetSummaryResponse,
  CreateBudgetCategory,
  UpdateBudgetCategory,
} from './types';
import { DateFilterParams } from '@/features/shared/types';
import { AccountDashboardResponse } from '../account/types';

export const fetchBudgetsByCategoryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  return get<BudgetCategoryResponse>(
    `/budgets/by-category?${query.toString()}`
  );
};

export const fetchBudgetSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<BudgetSummaryResponse>(`/budgets/summary?${query.toString()}`);
};

export const createBudgetCategoryAPI = async (data: CreateBudgetCategory) => {
  return await post('/budgets/by-category', data);
};

export const updateBudgetCategoryAPI = async (
  id: string,
  data: UpdateBudgetCategory
) => {
  return await put(`/budgets/by-category/${id}`, data);
};

export const fetchAccountsDashboardAPI =
  async (): Promise<AccountDashboardResponse> => {
    return await get('/accounts/dashboard');
  };

export const getBudgetCategoriesByCategoryIdAPI = async (
  categoryId: string,
  data: DateFilterParams
): Promise<BudgetCategoryGroupResponse> => {
  return await post(`/budgets/by-category/${categoryId}`, data);
};
