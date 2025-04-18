import { get, post, put } from '@/lib/api';
import {
  BudgetCategoryGroupResponseDTO,
  BudgetSummaryResponseDTO,
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryDTO,
} from './types';
import { DateFilterParams } from '@/features/shared/types';
import { AccountDashboardResponseDTO } from '../account/types';

//
// Fetch budgets grouped by category
//
export const fetchBudgetsByCategoryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<BudgetCategoryGroupResponseDTO>(
    `/budgets/by-category?${query.toString()}`
  );
};

//
// Fetch summary of budgets for a period
//
export const fetchBudgetSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<BudgetSummaryResponseDTO>(`/budgets/summary?${query.toString()}`);
};

//
// Create a new budget category
//
export const createBudgetCategoryAPI = (data: CreateBudgetCategoryDTO) => {
  return post('/budgets/by-category', data);
};

//
// Update an existing budget category by ID
//
export const updateBudgetCategoryAPI = (
  id: string,
  data: UpdateBudgetCategoryDTO
) => {
  return put(`/budgets/by-category/${id}`, data);
};

//
// Fetch budget group data by category ID
//
export const getBudgetCategoriesByCategoryIdAPI = (
  categoryId: string,
  data: DateFilterParams
): Promise<BudgetCategoryGroupResponseDTO> => {
  return post(`/budgets/by-category/${categoryId}`, data);
};

//
// Fetch account dashboard for budget sidebar
//
export const fetchAccountsDashboardAPI = (): Promise<AccountDashboardResponseDTO> => {
  return get('/accounts/dashboard');
};
