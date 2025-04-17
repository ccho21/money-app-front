import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  BudgetCategoryGroupItem,
  BudgetCategoryGroupResponseDTO,
  BudgetSummaryResponseDTO,
  BudgetCategoryGroupResponseDTO,
} from '@/features/budget/types';

interface BudgetStoreState {
  budgetCategoryResponse?: BudgetCategoryGroupResponseDTO;
  budgetCategoryGroupResponse?: BudgetCategoryGroupResponseDTO;
  budgetCategory?: BudgetCategoryGroupItem;
  budgetSummaryResponse?: BudgetSummaryResponseDTO;
  isLoading: boolean;
  error: string | null;
}

interface BudgetStoreActions {
  setBudgetCategoryResponse: (data: BudgetCategoryGroupResponseDTO) => void;
  setBudgetCategoryGroupResponse: (
    data: BudgetCategoryGroupResponseDTO
  ) => void;
  setBudgetCategory: (data: BudgetCategoryGroupItem) => void;
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
  budgetCategory: undefined,
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

        setBudgetCategory: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetCategory: data },
            }),
            false,
            'budget/setBudgetCategory'
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
