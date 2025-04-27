import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  createBudgetCategoryAPI,
  updateBudgetCategoryAPI,
  fetchGroupedBudgetCategoryAPI,
} from './api';
import type {
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryUpdateRequestDTO,
} from './types';
import type { DateFilterParams } from '@/common/types';

type Mode = 'new' | 'edit';

type BudgetFormState = {
  form: BudgetCategoryCreateRequestDTO;
  loading: boolean;
  error: string | null;
  success: boolean;
  mode: Mode;
};

type BudgetFormActions = {
  setForm: (form: BudgetCategoryCreateRequestDTO) => void;
  setField: <K extends keyof BudgetCategoryCreateRequestDTO>(
    key: K,
    value: BudgetCategoryCreateRequestDTO[K]
  ) => void;
  setMode: (mode: Mode) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  loadForm: (categoryId: string, params: DateFilterParams) => Promise<void>;
};

const initialForm: BudgetCategoryCreateRequestDTO = {
  categoryId: '',
  amount: 0,
  startDate: '',
  endDate: '',
  type: 'expense', // default; adjust if needed
};

export const useBudgetFormStore = create<BudgetFormState & BudgetFormActions>()(
  devtools((set, get) => ({
    form: initialForm,
    loading: false,
    error: null,
    success: false,
    mode: 'new',

    setForm: (form) => set({ form }, false, 'budgetForm/setForm'),

    setField: (key, value) =>
      set(
        (state) => ({
          form: { ...state.form, [key]: value },
        }),
        false,
        'budgetForm/setField'
      ),

    setMode: (mode) => set({ mode }, false, 'budgetForm/setMode'),

    resetForm: () =>
      set(
        {
          form: initialForm,
          error: null,
          success: false,
        },
        false,
        'budgetForm/resetForm'
      ),

    submitForm: async () => {
      const { form, mode } = get();
      set(
        { loading: true, error: null, success: false },
        false,
        'budgetForm/submit:start'
      );
      try {
        if (mode === 'new') {
          await createBudgetCategoryAPI(form);
        } else {
          await updateBudgetCategoryAPI(
            form.categoryId,
            form as BudgetCategoryUpdateRequestDTO
          );
        }
        set({ success: true }, false, 'budgetForm/submit:success');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Submission failed';
        set({ error: message }, false, 'budgetForm/submit:error');
      } finally {
        set({ loading: false }, false, 'budgetForm/submit:end');
      }
    },

    loadForm: async (categoryId, params) => {
      set({ loading: true, error: null }, false, 'budgetForm/load:start');
      try {
        const data = await fetchGroupedBudgetCategoryAPI(categoryId, params);
        const firstPeriod = data.budgets[0];
        console.log('### first period', firstPeriod);
        if (!firstPeriod) {
          throw new Error('No budget data found for this category');
        }
        set(
          {
            form: {
              categoryId,
              amount: firstPeriod.amount,
              startDate: firstPeriod.rangeStart,
              endDate: firstPeriod.rangeEnd,
              type: data.type,
            },
            mode: 'edit',
          },
          false,
          'budgetForm/load:success'
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load form';
        set({ error: message }, false, 'budgetForm/load:error');
      } finally {
        set({ loading: false }, false, 'budgetForm/load:end');
      }
    },
  }))
);
