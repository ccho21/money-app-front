import { get } from '@/features/shared/api';
import { BudgetUsage } from '@/features/budget/types';
import { AccountTransactionSummaryParams } from '@/features/account/types';

export const fetchBudgetUsageAPI = (
  params: AccountTransactionSummaryParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);

  return get<BudgetUsage[]>(`/budgets/usage?${query.toString()}`);
};
