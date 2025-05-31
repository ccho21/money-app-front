import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetCategoryCreateRequestDTO } from '../types/types';

type Mode = 'new' | 'edit';

type BudgetFormState = {
  form: {
    categoryId: string;
    amount: string; // ✅ string으로 변경
    startDate: string;
    endDate: string;
  };
  mode: Mode;
};

type BudgetFormActions = {
  setForm: (form: Partial<BudgetFormState['form']>) => void;
  setField: <K extends keyof BudgetFormState['form']>(
    key: K,
    value: BudgetFormState['form'][K]
  ) => void;
  setMode: (mode: Mode) => void;
  resetForm: () => void;
  getCreateFormData: () => BudgetCategoryCreateRequestDTO;
};

const initialForm: BudgetFormState['form'] = {
  categoryId: '',
  amount: '', // ✅ string 기본값
  startDate: '',
  endDate: '',
};

export const useBudgetFormStore = create<BudgetFormState & BudgetFormActions>()(
  devtools((set, get) => ({
    form: initialForm,
    mode: 'new',

    setForm: (partialForm) =>
      set(
        (state) => ({
          form: {
            ...state.form,
            ...Object.fromEntries(
              Object.entries(partialForm).map(([k, v]) =>
                k === 'amount' ? [k, String(v)] : [k, v]
              )
            ),
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
            [key]: key === 'amount' ? String(value) : value,
          },
        }),
        false,
        'budgetForm/setField'
      ),

    setMode: (mode) =>
      set({ mode }, false, 'budgetForm/setMode'),

    resetForm: () =>
      set({ form: initialForm }, false, 'budgetForm/resetForm'),

    getCreateFormData: () => {
      const { form } = get();
      return {
        categoryId: form.categoryId,
        amount: parseFloat(form.amount),
        startDate: form.startDate,
        endDate: form.endDate,
      };
    },
  }))
);
