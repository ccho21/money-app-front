import { get } from '@/features/shared/api';
import { StatsBudgetUsageParams } from './types';
import { BudgetUsage } from '../budget/types';

export const fetchStatsBudgetUsageAPI = (
  params: StatsBudgetUsageParams
): Promise<BudgetUsage[]> => {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/analysis/budget-usage?${query.toString()}`);
};
