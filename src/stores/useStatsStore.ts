// 📄 src/stores/stats/stats.store.ts

import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
} from "@/features/stats/types";
import { TransactionSummaryResponse } from "@/features/transaction/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StatsStore {
  state: {
    categoryResponse?: StatsByCategoryResponse;
    budgetResponse?: StatsByBudgetResponse;
    noteResponse?: StatsByNoteResponse;
    categoryDetailResponse?: TransactionSummaryResponse;
    budgetDetailResponse?: TransactionSummaryResponse;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setCategoryResponse: (data: StatsByCategoryResponse) => void;
    setBudgetResponse: (data: StatsByBudgetResponse) => void;
    setNoteResponse: (data: StatsByNoteResponse) => void;
    setCategoryDetailResponse: (data: TransactionSummaryResponse) => void;
    setBudgetDetailResponse: (data: TransactionSummaryResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
  };
}

export const useStatsStore = create<StatsStore>()(
  devtools(
    (set) => ({
      state: {
        isLoading: false,
        error: null,
      },
      actions: {
        setCategoryResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, categoryResponse: data },
            }),
            false,
            "stats/setCategoryResponse"
          ),
        setBudgetResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetResponse: data },
            }),
            false,
            "stats/setBudgetResponse"
          ),
        setNoteResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, noteResponse: data },
            }),
            false,
            "stats/setNoteResponse"
          ),
        setCategoryDetailResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, categoryDetailResponse: data },
            }),
            false,
            "stats/setCategoryDetailResponse"
          ),
        setBudgetDetailResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetDetailResponse: data },
            }),
            false,
            "stats/setBudgetDetailResponse"
          ),
        setLoading: (loading) =>
          set(
            (s) => ({
              state: { ...s.state, isLoading: loading },
            }),
            false,
            loading ? "ui/loading:start" : "ui/loading:done"
          ),
        setError: (error) =>
          set(
            (s) => ({
              state: { ...s.state, error },
            }),
            false,
            "ui/setError"
          ),
        clear: () =>
          set(
            () => ({
              state: {
                categoryResponse: undefined,
                budgetResponse: undefined,
                noteResponse: undefined,
                categoryDetailResponse: undefined,
                budgetDetailResponse: undefined,
                isLoading: false,
                error: null,
              },
            }),
            false,
            "stats/clearAll"
          ),
      },
    }),
    { name: "useStatsStore" }
  )
);
