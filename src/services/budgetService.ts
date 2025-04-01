import { fetchBudgetUsageAPI } from '@/features/budget/api';
import { AccountTransactionSummaryParams } from '@/features/shared/types';
import { useBudgetStore } from '@/stores/useBudgetStore';

export const fetchBudgetUsage = async (
  params: AccountTransactionSummaryParams
) => {
  const {
    actions: { setBudgetUsageItems, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetUsageAPI(params);
    setBudgetUsageItems(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '예산 데이터 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};
