import { get, post, put } from '@/lib/api';
import {
  BudgetCategoryGroupResponseDTO,
  BudgetCategoryGroupResponseDTO,
  BudgetSummaryResponseDTO,
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryDTO,
} from './types';
import { DateFilterParams } from '@/features/shared/types';
import { AccountDashboardResponseDTO } from '../account/types';

export const fetchBudgetsByCategoryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  return get<BudgetCategoryGroupResponseDTO>(
    `/budgets/by-category?${query.toString()}`
  );
};

export const fetchBudgetSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<BudgetSummaryResponseDTO>(`/budgets/summary?${query.toString()}`);
};

export const createBudgetCategoryAPI = async (
  data: CreateBudgetCategoryDTO
) => {
  return await post('/budgets/by-category', data);
};

export const updateBudgetCategoryAPI = async (
  id: string,
  data: UpdateBudgetCategoryDTO
) => {
  return await put(`/budgets/by-category/${id}`, data);
};

export const fetchAccountsDashboardAPI =
  async (): Promise<AccountDashboardResponseDTO> => {
    return await get('/accounts/dashboard');
  };

export const getBudgetCategoriesByCategoryIdAPI = async (
  categoryId: string,
  data: DateFilterParams
): Promise<BudgetCategoryGroupResponseDTO> => {
  return await post(`/budgets/by-category/${categoryId}`, data);
};
