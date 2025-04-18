import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  CreateBudgetCategoryDTO,
  UpdateBudgetCategoryGroupDTO,
} from '@/features/budget/types';
import { RangeOption } from '@/features/shared/types';
import { getDateRangeKey } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';

interface BudgetCategoryFormState {
  categoryId: string;
  budgetId: string; // newly added
  amount: string;
  startDate: string;
  endDate: string;
  groupBy: RangeOption;
}

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
          const { date, range } = useFilterStore.getState().query;
          const dateRangeKey = getDateRangeKey(date, { unit: range, amount: 0 });
          const [startDate, endDate] = dateRangeKey.split('_');

          set((s) => ({
            state: {
              ...s.state,
              startDate,
              endDate,
              groupBy: range,
            },
          }));
        },

        getCreateFormData: () => {
          const { categoryId, amount, startDate, endDate, groupBy } = get().state;
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
              amount,
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
