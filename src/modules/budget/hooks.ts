// 파일: src/modules/budget/hooks.ts

import { useBudgetStore } from './store';
import {
  createBudgetCategoryAPI,
  updateBudgetCategoryAPI,
  deleteBudgetCategoryAPI,
  fetchBudgetCategoriesAPI,
  fetchBudgetSettingsAPI,
} from './api';
import {
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryUpdateRequestDTO,
  BudgetCategoryItemDTO,
} from './types';
import type { DateFilterParams } from '@/common/types';

// Normalize amount if needed
const normalizeAmount = (amount: string | number): number =>
  typeof amount === 'string' ? Number(amount) : amount;

// Fetch active budgets by category
export const fetchBudgetCategories = async (params: DateFilterParams) => {
  const { setBudgetCategoryResponse, setLoading, setError } =
    useBudgetStore.getState();
  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetCategoriesAPI(params);
    setBudgetCategoryResponse(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch budgets';
    setError(msg);
  } finally {
    setLoading(false);
  }
};

// Fetch all saved budget category settings
export const fetchBudgetSettings = async () => {
  const { setBudgetSettings, setLoading, setError } = useBudgetStore.getState();
  setLoading(true);
  setError(null);

  try {
    const data = await fetchBudgetSettingsAPI();
    setBudgetSettings(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch settings';
    setError(msg);
  } finally {
    setLoading(false);
  }
};

// Create new budget config
export const createBudgetCategory = async (
  payload: BudgetCategoryCreateRequestDTO
): Promise<BudgetCategoryItemDTO> => {
  const normalized = {
    ...payload,
    amount: normalizeAmount(payload.amount),
  };
  return await createBudgetCategoryAPI(normalized);
};

// Update budget config
export const updateBudgetCategory = async (
  id: string,
  payload: BudgetCategoryUpdateRequestDTO
): Promise<BudgetCategoryItemDTO> => {
  return await updateBudgetCategoryAPI(id, payload);
};

// Delete budget config
export const deleteBudgetCategory = async (id: string): Promise<void> => {
  await deleteBudgetCategoryAPI(id);
};
