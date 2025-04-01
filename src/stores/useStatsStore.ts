// 📄 src/stores/stats/stats.store.ts

import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
} from "@/features/stats/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StatsStore {
  state: {
    categoryResponse?: StatsByCategoryResponse;
    budgetResponse?: StatsByBudgetResponse;
    noteResponse?: StatsByNoteResponse;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setCategories: (data: StatsByCategoryResponse) => void;
    setBudgetResponse: (data: StatsByBudgetResponse) => void;
    setNoteResponse: (data: StatsByNoteResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
  };
}

export const useStatsStore = create<StatsStore>()(
  devtools(
    (set) => ({
      state: {
        categories: [],
        isLoading: false,
        error: null,
      },
      actions: {
        setCategories: (data) =>
          set(
            (s) => ({
              state: { ...s.state, categoryResponse: data },
            }),
            false,
            "stats/setCategories"
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
