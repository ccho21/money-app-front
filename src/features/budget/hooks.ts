// src/features/budget/hooks.ts

import { DateFilterParams } from '@/features/shared/types';
import { useBudgetStore } from '@/stores/useBudgetStore';
import {
  createBudgetCategoryAPI,
  fetchBudgetsByCategoryAPI,
  fetchBudgetSummaryAPI,
  getBudgetCategoriesByCategoryIdAPI,
  updateBudgetCategoryAPI,
} from './api';
import {
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryDTO,
  BudgetSummaryResponseDTO,
  BudgetCategoryListResponseDTO,
  BudgetGroupItemDTO,
} from './types';

//
// Normalize string/number amount to number
//
const normalizeAmount = (amount: string | number): number =>
  typeof amount === 'string' ? Number(amount) : amount;

//
// Fetch budget categories by filter range
//
export const fetchBudgetsByCategory = async (
  params: DateFilterParams
): Promise<void> => {
  const {
    actions: { setBudgetCategoryResponse, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data: BudgetCategoryListResponseDTO = await fetchBudgetsByCategoryAPI(
      params
    );
    setBudgetCategoryResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch budget categories';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Fetch budget summary for current period
//
export const fetchBudgetSummary = async (
  params: DateFilterParams
): Promise<void> => {
  const {
    actions: { setBudgetSummaryResponse, setLoading, setError },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data: BudgetSummaryResponseDTO = await fetchBudgetSummaryAPI(params);
    setBudgetSummaryResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch budget summary';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Create a new budget category
//
export const createBudgetCategory = async (
  data: CreateBudgetCategoryDTO
): Promise<{ budgetId: string; message: string }> => {
  try {
    const prepared = {
      ...data,
      amount: normalizeAmount(data.amount),
    };
    return await createBudgetCategoryAPI(prepared);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to create budget'
    );
  }
};

//
// Update an existing budget category
//
export const updateBudgetCategory = async (
  id: string,
  data: UpdateBudgetCategoryDTO
): Promise<{ budgetId: string; message: string }> => {
  try {
    return await updateBudgetCategoryAPI(id, data);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to update budget'
    );
  }
};

//
// Fetch all budget groups by category ID (detailed chart view)
//
export const fetchBudgetCategoriesByCategoryId = async (
  categoryId: string,
  filter: DateFilterParams
): Promise<void> => {
  const {
    actions: { setLoading, setError, setBudgetCategoryGroupResponse },
  } = useBudgetStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data: BudgetGroupItemDTO = await getBudgetCategoriesByCategoryIdAPI(
      categoryId,
      filter
    );
    setBudgetCategoryGroupResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch budget group data';
    setError(message);
  } finally {
    setLoading(false);
  }
};
