import { DateFilterParams } from '@/features/shared/types';
import { useBudgetStore } from '@/app/budget/settings/_components/useBudgetStore';
import {
  createBudgetCategoryAPI,
  fetchBudgetsByCategoryAPI,
  fetchBudgetSummaryAPI,
  getBudgetCategoriesByCategoryIdAPI,
  updateBudgetCategoryAPI,
} from './budget/api';
import { CreateBudgetCategory, UpdateBudgetCategory } from './budget/types';

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

export const createBudgetCategory = async (data: CreateBudgetCategory) => {
  try {
    if (typeof data.amount === 'string') data.amount = Number(data.amount);
    const response = await createBudgetCategoryAPI(data);
    return response;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '예산 생성 실패');
  }
};

export const updateBudgetCategory = async (
  id: string,
  data: UpdateBudgetCategory
) => {
  try {
    const response = await updateBudgetCategoryAPI(id, data);
    return response;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '예산 수정 실패');
  }
};

export const fetchBudgetCategoriesByCategoryId = async (
  categoryId: string,
  filter: DateFilterParams
) => {
  const { setLoading, setError, setBudgetCategoryGroupResponse } =
    useBudgetStore.getState().actions;

  try {
    setLoading(true);
    setError(null);
    const data = await getBudgetCategoriesByCategoryIdAPI(categoryId, filter);
    setBudgetCategoryGroupResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '예산 데이터를 불러오지 못했습니다.';
    setError(message);
  } finally {
    setLoading(false);
  }
};
