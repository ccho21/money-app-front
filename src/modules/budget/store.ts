// 📁 src/stores/useBudgetStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  BudgetCategoryListResponseDTO,
  BudgetGroupItemDTO,
  BudgetSummaryResponseDTO,
} from '@/features/budget/types';

interface BudgetStoreState {
  budgetCategoryResponse?: BudgetCategoryListResponseDTO;
  budgetCategoryGroupResponse?: BudgetGroupItemDTO;
  budgetSummaryResponse?: BudgetSummaryResponseDTO;
  isLoading: boolean;
  error: string | null;
}

interface BudgetStoreActions {
  setBudgetCategoryResponse: (data: BudgetCategoryListResponseDTO) => void;
  setBudgetCategoryGroupResponse: (data: BudgetGroupItemDTO) => void;
  setBudgetSummaryResponse: (data: BudgetSummaryResponseDTO) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}

interface BudgetStore {
  state: BudgetStoreState;
  actions: BudgetStoreActions;
}

const initialState: BudgetStoreState = {
  budgetCategoryResponse: undefined,
  budgetCategoryGroupResponse: undefined,
  budgetSummaryResponse: undefined,
  isLoading: false,
  error: null,
};

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    (set) => ({
      state: { ...initialState },
      actions: {
        setBudgetCategoryResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetCategoryResponse: data },
            }),
            false,
            'budget/setBudgetCategoryResponse'
          ),

        setBudgetCategoryGroupResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetCategoryGroupResponse: data },
            }),
            false,
            'budget/setBudgetCategoryGroupResponse'
          ),

        setBudgetSummaryResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetSummaryResponse: data },
            }),
            false,
            'budget/setBudgetSummaryResponse'
          ),

        setLoading: (loading) =>
          set(
            (s) => ({
              state: { ...s.state, isLoading: loading },
            }),
            false,
            loading ? 'ui/loading:start' : 'ui/loading:done'
          ),

        setError: (error) =>
          set(
            (s) => ({
              state: { ...s.state, error },
            }),
            false,
            'ui/setError'
          ),

        clearStore: () =>
          set(
            () => ({ state: { ...initialState } }),
            false,
            'budget/clearStore'
          ),
      },
    }),
    { name: 'BudgetStore' }
  )
);
