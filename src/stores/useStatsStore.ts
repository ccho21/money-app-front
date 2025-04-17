// 📄 src/stores/stats/stats.store.ts

import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
  StatsSummaryByBudgetResponse,
  StatsSummaryByCategoryResponse,
  StatsSummaryByNoteResponse,
} from '@/features/stats/types';
import { TransactionGroupSummaryDTO } from '@/features/transaction/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatsStore {
  state: {
    statsSummaryCategoryResposne?: StatsSummaryByCategoryResponse;
    statsSummaryBudgetResposne?: StatsSummaryByBudgetResponse;
    noteSummaryResponse?: StatsSummaryByNoteResponse;

    categoryResponse?: StatsByCategoryResponse;
    budgetResponse?: StatsByBudgetResponse;
    noteResponse?: StatsByNoteResponse;

    categoryDetailResponse?: TransactionGroupSummaryDTO;
    budgetDetailResponse?: TransactionGroupSummaryDTO;
    noteDetailResponse?: TransactionGroupSummaryDTO;

    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setstatsSummaryCategoryResposne: (
      data: StatsSummaryByCategoryResponse
    ) => void;
    setstatsSummaryBudgetResposne: (data: StatsSummaryByBudgetResponse) => void;
    setNoteSummaryResponse: (data: StatsSummaryByNoteResponse) => void;

    setCategoryResponse: (data: StatsByCategoryResponse) => void;
    setBudgetResponse: (data: StatsByBudgetResponse) => void;
    setNoteResponse: (data: StatsByNoteResponse) => void;

    setCategoryDetailResponse: (data?: TransactionGroupSummaryDTO) => void;
    setBudgetDetailResponse: (data: TransactionGroupSummaryDTO) => void;
    setNoteDetailResponse: (data: TransactionGroupSummaryDTO) => void;

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
        // ✅ Summary Setters
        setstatsSummaryCategoryResposne: (data) =>
          set(
            (s) => ({
              state: { ...s.state, statsSummaryCategoryResposne: data },
            }),
            false,
            'stats/setStatsSummaryCategoryResponse'
          ),

        setstatsSummaryBudgetResposne: (data) =>
          set(
            (s) => ({
              state: { ...s.state, statsSummaryBudgetResposne: data },
            }),
            false,
            'stats/setStatsSummaryBudgetResposne'
          ),

        setNoteSummaryResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, noteSummaryResponse: data } }),
            false,
            'noteDetail/setNoteSummaryResponse'
          ),

        // ✅ Response Setters
        setCategoryResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, categoryResponse: data } }),
            false,
            'stats/setCategoryResponse'
          ),

        setBudgetResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, budgetResponse: data } }),
            false,
            'stats/setBudgetResponse'
          ),

        setNoteResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, noteResponse: data } }),
            false,
            'stats/setNoteResponse'
          ),

        // ✅ Detail Setters
        setCategoryDetailResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, categoryDetailResponse: data } }),
            false,
            'stats/setCategoryDetailResponse'
          ),

        setBudgetDetailResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, budgetDetailResponse: data } }),
            false,
            'stats/setBudgetDetailResponse'
          ),

        setNoteDetailResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, noteDetailResponse: data } }),
            false,
            'stats/setNoteDetailResponse'
          ),

        // ✅ UI State
        setLoading: (loading) =>
          set(
            (s) => ({ state: { ...s.state, isLoading: loading } }),
            false,
            loading ? 'ui/loading:start' : 'ui/loading:done'
          ),

        setError: (error) =>
          set((s) => ({ state: { ...s.state, error } }), false, 'ui/setError'),

        // ✅ Clear All
        clear: () =>
          set(
            () => ({
              state: {
                statsSummaryCategoryResposne: undefined,
                statsSummaryBudgetResposne: undefined,
                noteSummaryResponse: undefined,
                categoryResponse: undefined,
                budgetResponse: undefined,
                noteResponse: undefined,
                categoryDetailResponse: undefined,
                budgetDetailResponse: undefined,
                noteDetailResponse: undefined,
                isLoading: false,
                error: null,
              },
            }),
            false,
            'stats/clearAll'
          ),
      },
    }),
    { name: 'useStatsStore' }
  )
);
