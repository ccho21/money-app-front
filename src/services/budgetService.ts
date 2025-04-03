import { fetchBudgetsAPI, fetchBudgetSummaryAPI } from '@/features/budget/api';
import { AccountTransactionSummaryParams } from '@/features/shared/types';
import { useBudgetStore } from '@/stores/useBudgetStore';

export const fetchBudgets = async () => {
  const {
    actions: { setBudgets, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetsAPI();
    setBudgets(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchBudgetSummary = async (
  params: AccountTransactionSummaryParams
) => {
  const {
    actions: { setBudgetSummaryResponse, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetSummaryAPI(params);
    setBudgetSummaryResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '예산 데이터 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};
