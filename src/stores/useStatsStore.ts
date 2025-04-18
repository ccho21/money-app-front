import {
  StatsCategoryGroupItemDTO,
  StatsBudgetGroupItemDTO,
  StatsNoteGroupItemDTO,
  StatsCategorySummaryDTO,
  StatsBudgetSummaryDTO,
  StatsNoteSummaryDTO,
  StatsCategoryPeriodDTO,
  StatsBudgetPeriodDTO,
  StatsNotePeriodDTO,
} from '@/features/stats/types';

import { BaseListSummaryResponseDTO } from '@/features/shared/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatsStore {
  state: {
    categorySummaryResponse?: StatsCategorySummaryDTO;
    budgetSummaryResponse?: StatsBudgetSummaryDTO;
    noteSummaryResponse?: StatsNoteSummaryDTO;

    categoryResponse?: BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO>;
    budgetResponse?: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>;
    noteResponse?: BaseListSummaryResponseDTO<StatsNoteGroupItemDTO>;

    categoryDetailResponse?: StatsCategoryPeriodDTO;
    budgetDetailResponse?: StatsBudgetPeriodDTO;
    noteDetailResponse?: StatsNotePeriodDTO;

    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setCategorySummaryResponse: (data: StatsCategorySummaryDTO) => void;
    setBudgetSummaryResponse: (data: StatsBudgetSummaryDTO) => void;
    setNoteSummaryResponse: (data: StatsNoteSummaryDTO) => void;

    setCategoryResponse: (
      data: BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO>
    ) => void;
    setBudgetResponse: (
      data: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>
    ) => void;
    setNoteResponse: (
      data: BaseListSummaryResponseDTO<StatsNoteGroupItemDTO>
    ) => void;

    setCategoryDetailResponse: (data: StatsCategoryPeriodDTO) => void;
    setBudgetDetailResponse: (data: StatsBudgetPeriodDTO) => void;
    setNoteDetailResponse: (data: StatsNotePeriodDTO) => void;

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
        // Summary
        setCategorySummaryResponse: (data) =>
          set((s) => ({
            state: { ...s.state, categorySummaryResponse: data },
          })),
        setBudgetSummaryResponse: (data) =>
          set((s) => ({ state: { ...s.state, budgetSummaryResponse: data } })),
        setNoteSummaryResponse: (data) =>
          set((s) => ({ state: { ...s.state, noteSummaryResponse: data } })),

        // Group responses
        setCategoryResponse: (data) =>
          set((s) => ({ state: { ...s.state, categoryResponse: data } })),
        setBudgetResponse: (data) =>
          set((s) => ({ state: { ...s.state, budgetResponse: data } })),
        setNoteResponse: (data) =>
          set((s) => ({ state: { ...s.state, noteResponse: data } })),

        // Detail responses
        setCategoryDetailResponse: (data) =>
          set((s) => ({ state: { ...s.state, categoryDetailResponse: data } })),
        setBudgetDetailResponse: (data) =>
          set((s) => ({ state: { ...s.state, budgetDetailResponse: data } })),
        setNoteDetailResponse: (data) =>
          set((s) => ({ state: { ...s.state, noteDetailResponse: data } })),

        // UI
        setLoading: (loading) =>
          set((s) => ({ state: { ...s.state, isLoading: loading } })),
        setError: (error) => set((s) => ({ state: { ...s.state, error } })),

        // Clear
        clear: () =>
          set(() => ({
            state: {
              categorySummaryResponse: undefined,
              budgetSummaryResponse: undefined,
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
          })),
      },
    }),
    { name: 'useStatsStore' }
  )
);
