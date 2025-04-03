import {
  fetchBudgetSummaryAPI,
  fetchBudgetsByCategoryAPI,
} from '@/features/budget/api';
import { DateFilterParams } from '@/features/shared/types';
import { useBudgetStore } from '@/stores/useBudgetStore';

export const fetchBudgetsByCategory = async (params: DateFilterParams) => {
  const {
    actions: { setBudgetCategoryResponse, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetsByCategoryAPI(params);
    setBudgetCategoryResponse(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchBudgetSummary = async (params: DateFilterParams) => {
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
