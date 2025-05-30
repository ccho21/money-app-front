import { DateFilterParams } from '@/modules/shared/common/types';
import {
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryItemDTO,
  BudgetCategoryListResponseDTO,
  BudgetCategoryUpdateRequestDTO,
  BudgetGroupItemDTO,
  BudgetSummaryDTO,
} from '../types/types';
import {
  createBudgetCategoryAPI,
  fetchBudgetByCategoryAPI,
  fetchBudgetSummaryAPI,
  fetchGroupedBudgetCategoryAPI,
  updateBudgetCategoryAPI,
} from '../api';
import { useBudgetStore } from '../stores/store';

const normalizeAmount = (amount: string | number): number =>
  typeof amount === 'string' ? Number(amount) : amount;

/**
 * ✅ [GET] /budgets/by-category
 */
export const fetchBudgetsByCategory = async (
  params: DateFilterParams
): Promise<void> => {
  const { setBudgets, setLoading, setError } = useBudgetStore.getState();
  setLoading(true);
  try {
    const data: BudgetCategoryListResponseDTO = await fetchBudgetByCategoryAPI(
      params
    );
    setBudgets(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch budget categories';
    setError(message);
  } finally {
    setLoading(false);
  }
};

/**
 * ✅ [GET] /budgets/summary
 */
export const fetchBudgetSummary = async (
  params: DateFilterParams
): Promise<void> => {
  const { setSummary, setLoading, setError } = useBudgetStore.getState();
  setLoading(true);
  try {
    const data: BudgetSummaryDTO = await fetchBudgetSummaryAPI(params);
    setSummary(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch budget summary';
    setError(message);
  } finally {
    setLoading(false);
  }
};

/**
 * ✅ [POST] /budgets/by-category
 */
export const createBudgetCategory = async (
  data: BudgetCategoryCreateRequestDTO
): Promise<BudgetCategoryItemDTO> => {
  const prepared = { ...data, amount: normalizeAmount(data.amount) };
  return await createBudgetCategoryAPI(prepared);
};

/**
 * ✅ [PUT] /budgets/by-category/:id
 */
export const updateBudgetCategory = async (
  id: string,
  data: BudgetCategoryUpdateRequestDTO
): Promise<BudgetCategoryItemDTO> => {
  return await updateBudgetCategoryAPI(id, data);
};

/**
 * ✅ [POST] /budgets/by-category/:categoryId (grouped view)
 */
export const fetchGroupedBudgetCategory = async (
  categoryId: string,
  filter: DateFilterParams
): Promise<void> => {
  const { setBudgetGroup, setLoading, setError } = useBudgetStore.getState();
  setLoading(true);
  try {
    const data: BudgetGroupItemDTO = await fetchGroupedBudgetCategoryAPI(
      categoryId,
      filter
    );
    setBudgetGroup(data);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Failed to fetch grouped budget data';
    setError(message);
  } finally {
    setLoading(false);
  }
};
