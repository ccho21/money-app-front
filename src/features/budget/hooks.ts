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
} from './types';

//
// Fetch budget categories by filter range
//
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
    const message = err instanceof Error ? err.message : 'Failed to fetch budget categories';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Fetch budget summary for current period
//
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
    const message = err instanceof Error ? err.message : 'Failed to fetch budget summary';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Create a new budget category
//
export const createBudgetCategory = async (data: CreateBudgetCategoryDTO) => {
  try {
    const prepared = {
      ...data,
      amount: typeof data.amount === 'string' ? Number(data.amount) : data.amount,
    };
    const response = await createBudgetCategoryAPI(prepared);
    return response;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to create budget');
  }
};

//
// Update an existing budget category
//
export const updateBudgetCategory = async (
  id: string,
  data: UpdateBudgetCategoryDTO
) => {
  try {
    const response = await updateBudgetCategoryAPI(id, data);
    return response;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to update budget');
  }
};

//
// Fetch all budget groups by category ID
//
export const fetchBudgetCategoriesByCategoryId = async (
  categoryId: string,
  filter: DateFilterParams
) => {
  const {
    setLoading,
    setError,
    setBudgetCategoryGroupResponse,
  } = useBudgetStore.getState().actions;

  try {
    setLoading(true);
    setError(null);
    const data = await getBudgetCategoriesByCategoryIdAPI(categoryId, filter);
    setBudgetCategoryGroupResponse(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch budget group data';
    setError(message);
  } finally {
    setLoading(false);
  }
};
