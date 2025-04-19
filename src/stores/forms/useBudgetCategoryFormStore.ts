// 📁 src/stores/forms/useBudgetCategoryFormStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryDTO,
} from '@/features/budget/types';
import { GroupBy } from '@/features/shared/types';
import { getDateRangeKey } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';

interface BudgetCategoryFormState {
  categoryId: string;
  budgetId: string;
  amount: string;
  startDate: string;
  endDate: string;
  groupBy: GroupBy;
}

type UpdateBudgetCategoryGroupDTO = UpdateBudgetCategoryDTO & {
  groupBy: GroupBy;
};

interface BudgetCategoryFormStore {
  state: BudgetCategoryFormState;
  actions: {
    setField: <K extends keyof BudgetCategoryFormState>(
      key: K,
      value: BudgetCategoryFormState[K]
    ) => void;
    setAllFields: (data: Partial<BudgetCategoryFormState>) => void;
    reset: () => void;
    syncWithDateFilter: () => void;
    getCreateFormData: () => CreateBudgetCategoryDTO;
    getUpdateFormData: () => { id: string; data: UpdateBudgetCategoryGroupDTO };
  };
}

const initialState: BudgetCategoryFormState = {
  categoryId: '',
  budgetId: '',
  amount: '',
  startDate: '',
  endDate: '',
  groupBy: 'monthly',
};

export const useBudgetCategoryFormStore = create<BudgetCategoryFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...initialState },
      actions: {
        setField: (key, value) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                [key]: value,
              },
            }),
            false,
            `BudgetCategoryForm/setField:${key}`
          ),

        setAllFields: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                ...data,
              },
            }),
            false,
            'BudgetCategoryForm/setAllFields'
          ),

        reset: () =>
          set(
            () => ({
              state: { ...initialState },
            }),
            false,
            'BudgetCategoryForm/reset'
          ),

        syncWithDateFilter: () => {
          const { date, groupBy } = useFilterStore.getState().query;
          const dateRangeKey = getDateRangeKey(date, {
            unit: groupBy,
            amount: 0,
          });
          const [startDate, endDate] = dateRangeKey.split('_');

          set((s) => ({
            state: {
              ...s.state,
              startDate,
              endDate,
              groupBy: groupBy,
            },
          }));
        },

        getCreateFormData: () => {
          const { categoryId, amount, startDate, endDate, groupBy } =
            get().state;

          return {
            categoryId,
            amount: Number(amount),
            startDate,
            endDate,
            groupBy,
          };
        },

        getUpdateFormData: () => {
          const { budgetId, amount, startDate, endDate, groupBy } = get().state;

          return {
            id: budgetId,
            data: {
              amount: Number(amount),
              startDate,
              endDate,
              groupBy,
            },
          };
        },
      },
    }),
    { name: 'BudgetCategoryFormStore' }
  )
);
