import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetCategoryCreateRequestDTO } from '../types/types';

type Mode = 'new' | 'edit';

type BudgetFormState = {
  form: BudgetCategoryCreateRequestDTO;
  mode: Mode;
};

type BudgetFormActions = {
  setForm: (form: Partial<BudgetCategoryCreateRequestDTO>) => void;
  setField: <K extends keyof BudgetCategoryCreateRequestDTO>(
    key: K,
    value: BudgetCategoryCreateRequestDTO[K]
  ) => void;
  setMode: (mode: Mode) => void;
  resetForm: () => void;
};

const initialForm: BudgetCategoryCreateRequestDTO = {
  categoryId: '',
  amount: 0,
  startDate: '',
  endDate: '',
};

export const useBudgetFormStore = create<BudgetFormState & BudgetFormActions>()(
  devtools((set) => ({
    form: initialForm,
    mode: 'new',

    setForm: (partialForm) =>
      set(
        (state) => ({
          form: {
            ...state.form,
            ...partialForm,
          },
        }),
        false,
        'budgetForm/setForm'
      ),

    setField: (key, value) =>
      set(
        (state) => ({
          form: {
            ...state.form,
            [key]: value,
          },
        }),
        false,
        'budgetForm/setField'
      ),

    setMode: (mode) =>
      set({ mode }, false, 'budgetForm/setMode'),

    resetForm: () =>
      set({ form: initialForm }, false, 'budgetForm/resetForm'),
  }))
);
