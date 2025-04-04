import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  BudgetCategory,
  BudgetCategoryResponse,
  BudgetSummaryResponse,
} from "./budget/types";

interface BudgetStoreState {
  budgetCategoryResponse?: BudgetCategoryResponse;
  budgetCategory?: BudgetCategory;
  budgetSummaryResponse?: BudgetSummaryResponse;
  isLoading: boolean;
  error: string | null;
}

interface BudgetStoreActions {
  setBudgetCategoryResponse: (data: BudgetCategoryResponse) => void;
  setBudgetCategory: (data: BudgetCategory) => void;
  setBudgetSummaryResponse: (data: BudgetSummaryResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

interface BudgetStore {
  state: BudgetStoreState;
  actions: BudgetStoreActions;
}

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    (set) => ({
      state: {
        budgetCategoryResponse: undefined,
        budgetCategory: undefined, // ✅ 추가
        budgetSummaryResponse: undefined,
        isLoading: false,
        error: null,
      },
      actions: {
        setBudgetCategoryResponse: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                budgetCategoryResponse: data,
              },
            }),
            false,
            "budget/setBudgetCategoryResponse"
          ),

        setBudgetCategory: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                budgetCategory: data,
              },
            }),
            false,
            "budget/setBudgetCategory"
          ),

        setBudgetSummaryResponse: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                budgetSummaryResponse: data,
              },
            }),
            false,
            "budget/setBudgetSummaryResponse"
          ),

        setLoading: (loading) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                isLoading: loading,
              },
            }),
            false,
            loading ? "ui/loading:start" : "ui/loading:done"
          ),

        setError: (error) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                error,
              },
            }),
            false,
            "ui/setError"
          ),

        clear: () =>
          set(
            () => ({
              state: {
                budgetCategoryResponse: undefined,
                budgetCategory: undefined, // ✅ 초기화에도 추가
                budgetSummaryResponse: undefined,
                isLoading: false,
                error: null,
              },
            }),
            false,
            "budget/clearAll"
          ),
      },
    }),
    { name: "useBudgetStore" }
  )
);
