// 파일: src/modules/budget/formStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryUpdateRequestDTO,
} from './types';
import type { GroupBy } from '@/shared/types';
import { getDateRangeKey } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';

type Mode = 'new' | 'edit';

interface BudgetCategoryFormState {
  mode: Mode;
  budgetId: string;
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
  groupBy: GroupBy;
}

interface BudgetCategoryFormActions {
  setField: <K extends keyof BudgetCategoryFormState>(
    key: K,
    value: BudgetCategoryFormState[K]
  ) => void;
  setAllFields: (data: Partial<BudgetCategoryFormState>) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
  syncWithDateFilter: () => void; // ⚠️ 구조 문서 외 기능
  getCreateFormData: () => BudgetCategoryCreateRequestDTO;
  getUpdateFormData: () => { id: string; data: BudgetCategoryUpdateRequestDTO };
}

const initialState: BudgetCategoryFormState = {
  mode: 'new',
  budgetId: '',
  categoryId: '',
  amount: 0,
  startDate: '',
  endDate: '',
  groupBy: 'monthly',
};

export const useBudgetCategoryFormStore = create<
  BudgetCategoryFormState & BudgetCategoryFormActions
>()(
  devtools((set, get) => ({
    ...initialState,

    setField: (key, value) => set({ [key]: value }),
    setAllFields: (data) => set({ ...data }),
    setMode: (mode) => set({ mode }),
    reset: () => set(initialState),

    syncWithDateFilter: () => {
      const { date, groupBy } = useFilterStore.getState().query;
      const range = getDateRangeKey(date, { unit: groupBy, amount: 0 });
      const [startDate, endDate] = range.split('_');
      set({ startDate, endDate, groupBy });
    },

    getCreateFormData: () => {
      const { categoryId, amount, startDate, endDate, groupBy } = get();
      return {
        categoryId,
        amount,
        startDate,
        endDate,
        groupBy,
      };
    },

    getUpdateFormData: () => {
      const { budgetId, amount, startDate, endDate, groupBy } = get();
      return {
        id: budgetId,
        data: {
          amount,
          startDate,
          endDate,
          groupBy,
        },
      };
    },
  }))
);
