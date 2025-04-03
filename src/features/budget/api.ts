import { get } from '@/features/shared/api';
import { Budget, BudgetSummaryResponse } from './types';
import { BudgetSummaryParams } from '../shared/types';

export const fetchBudgetsAPI = () => {
  return get<Budget[]>('/accounts');
};

export const fetchBudgetSummaryAPI = (params: BudgetSummaryParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);

  return get<BudgetSummaryResponse>(`/budgets/summary?${query.toString()}`);
};
