import { get } from '@/features/shared/api';
import { BudgetCategoryResponse, BudgetSummaryResponse } from './types';
import { DateFilterParams } from '../shared/types';

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
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);

  return get<BudgetSummaryResponse>(`/budgets/summary?${query.toString()}`);
};
