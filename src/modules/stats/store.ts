// 파일: src/modules/stats/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  StatsCategoryGroupItemDTO,
  StatsBudgetGroupItemDTO,
  StatsNoteGroupItemDTO,
  StatsCategorySummaryDTO,
  StatsBudgetSummaryDTO,
  StatsNoteSummaryDTO,
  StatsCategoryDetailDTO,
  StatsBudgetDetailDTO,
  StatsNoteDetailDTO,
} from './types';
import { BaseListSummaryResponseDTO } from '@/common/types';

type StatsStore = {
  // Group
  categoryGroup: BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO> | null;
  budgetGroup: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO> | null;
  noteGroup: BaseListSummaryResponseDTO<StatsNoteGroupItemDTO> | null;

  // Summary
  categorySummary: StatsCategorySummaryDTO | null;
  budgetSummary: StatsBudgetSummaryDTO | null;
  noteSummary: StatsNoteSummaryDTO | null;

  // Detail
  categoryDetail: StatsCategoryDetailDTO | null;
  budgetDetail: StatsBudgetDetailDTO | null;
  noteDetail: StatsNoteDetailDTO | null;

  // UI
  isLoading: boolean;
  error: string | null;

  // Actions
  setCategoryGroup: (
    data: BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO>
  ) => void;
  setBudgetGroup: (
    data: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>
  ) => void;
  setNoteGroup: (
    data: BaseListSummaryResponseDTO<StatsNoteGroupItemDTO>
  ) => void;

  setCategoryDetail: (data: StatsCategoryDetailDTO | null) => void;
  setBudgetDetail: (data: StatsBudgetDetailDTO | null) => void;
  setNoteDetail: (data: StatsNoteDetailDTO | null) => void;

  setCategorySummary: (data: StatsCategorySummaryDTO) => void;
  setBudgetSummary: (data: StatsBudgetSummaryDTO) => void;
  setNoteSummary: (data: StatsNoteSummaryDTO) => void;

  setLoading: (val: boolean) => void;
  setError: (val: string | null) => void;
  clear: () => void;
};

export const useStatsStore = create<StatsStore>()(
  devtools((set) => ({
    categorySummary: null,
    budgetSummary: null,
    noteSummary: null,

    categoryGroup: null,
    budgetGroup: null,
    noteGroup: null,

    categoryDetail: null,
    budgetDetail: null,
    noteDetail: null,

    isLoading: false,
    error: null,

    setCategoryGroup: (data) => set({ categoryGroup: data }),
    setBudgetGroup: (data) => set({ budgetGroup: data }),
    setNoteGroup: (data) => set({ noteGroup: data }),

    setCategoryDetail: (data) => set({ categoryDetail: data }),
    setBudgetDetail: (data) => set({ budgetDetail: data }),
    setNoteDetail: (data) => set({ noteDetail: data }),

    setCategorySummary: (data) => set({ categorySummary: data }),
    setBudgetSummary: (data) => set({ budgetSummary: data }),
    setNoteSummary: (data) => set({ noteSummary: data }),

    setLoading: (val) => set({ isLoading: val }),
    setError: (val) => set({ error: val }),

    clear: () =>
      set({
        categorySummary: null,
        budgetSummary: null,
        noteSummary: null,
        categoryGroup: null,
        budgetGroup: null,
        noteGroup: null,
        categoryDetail: null,
        budgetDetail: null,
        noteDetail: null,
        isLoading: false,
        error: null,
      }),
  }))
);
