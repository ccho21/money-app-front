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

type StatsStore = {
  // Summary
  categorySummary: StatsCategorySummaryDTO | null;
  budgetSummary: StatsBudgetSummaryDTO | null;
  noteSummary: StatsNoteSummaryDTO | null;

  // Group
  categoryGroup: StatsCategoryGroupItemDTO[];
  budgetGroup: StatsBudgetGroupItemDTO[];
  noteGroup: StatsNoteGroupItemDTO[];

  // Detail
  categoryDetail: StatsCategoryDetailDTO | null;
  budgetDetail: StatsBudgetDetailDTO | null;
  noteDetail: StatsNoteDetailDTO | null;

  // UI
  isLoading: boolean;
  error: string | null;

  // Actions
  setCategoryGroup: (data: StatsCategoryGroupItemDTO[]) => void;
  setBudgetGroup: (data: StatsBudgetGroupItemDTO[]) => void;
  setNoteGroup: (data: StatsNoteGroupItemDTO[]) => void;

  setCategoryDetail: (data: StatsCategoryDetailDTO) => void;
  setBudgetDetail: (data: StatsBudgetDetailDTO) => void;
  setNoteDetail: (data: StatsNoteDetailDTO) => void;

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

    categoryGroup: [],
    budgetGroup: [],
    noteGroup: [],

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
        categoryGroup: [],
        budgetGroup: [],
        noteGroup: [],
        categoryDetail: null,
        budgetDetail: null,
        noteDetail: null,
        isLoading: false,
        error: null,
      }),
  }))
);
