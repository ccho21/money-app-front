import { get } from '@/features/shared/api';
import { BudgetUsageItem } from '@/features/budget/types';
import { AccountTransactionSummaryParams } from '@/features/account/types';

export const fetchBudgetUsageAPI = (
  params: AccountTransactionSummaryParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);

  return get<BudgetUsageItem[]>(`/budgets/usage?${query.toString()}`);
};
