import { RangeOption } from '@/features/shared/types';
import { getDateRangeKey } from '@/lib/date.util';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetCategory } from '../../../../features/budget/types';

interface BudgetCategoryFormState {
  categoryId: string;
  amount: string;
  startDate: string; // yyyy-MM-dd
  endDate: string;
  groupBy: RangeOption;
}

interface BudgetCategoryFormActions {
  setField: <K extends keyof BudgetCategoryFormState>(
    field: K,
    value: BudgetCategoryFormState[K]
  ) => void;
  setAllFields: (data: Partial<BudgetCategory>) => void;
  reset: () => void;
  getFormData: () => BudgetCategoryFormState;
  syncWithDateFilter: () => void;
}

interface BudgetCategoryFormStore {
  state: BudgetCategoryFormState;
  actions: BudgetCategoryFormActions;
}

export const useBudgetCategoryFormStore = create<BudgetCategoryFormStore>()(
  devtools(
    (set, get) => ({
      state: {
        categoryId: '',
        amount: '',
        startDate: '',
        endDate: '',
        groupBy: 'monthly',
      },
      actions: {
        setField: (key, value) =>
          set(
            (s) => ({
              state: { ...s.state, [key]: value },
            }),
            false,
            `BudgetCategoryForm/setField:${key}`
          ),

        setAllFields: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                categoryId: data.categoryId ?? s.state.categoryId,
                amount:
                  data.budgetAmount !== undefined
                    ? String(data.budgetAmount)
                    : s.state.amount,
                startDate: data.startDate ?? s.state.startDate,
                endDate: data.endDate ?? s.state.endDate,
              },
            }),
            false,
            'budgetCategoryForm/setAllFields'
          ),

        reset: () =>
          set(() => ({
            state: {
              categoryId: '',
              amount: '',
              startDate: '',
              endDate: '',
              groupBy: 'monthly',
            },
          })),

        getFormData: () => {
          const { state } = get();
          return { ...state };
        },

        syncWithDateFilter: () => {
          const {
            state: { date, range },
          } = useDateFilterStore.getState();
          const dateRangeKey = getDateRangeKey(date, {
            unit: range,
            amount: 0,
          });
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
      },
    }),
    { name: 'BudgetCategoryFormStore' }
  )
);
