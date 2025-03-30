// 📄 src/stores/category/categoryForm.store.ts

import { CategoryType, CreateCategoryInput } from '@/features/category/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryFormState {
  name: string;
  type: CategoryType;
  icon: string;

  setField: <
    T extends keyof Omit<
      CategoryFormState,
      'setField' | 'reset' | 'fillForm' | 'getFormData'
    >
  >(
    field: T,
    value: CategoryFormState[T]
  ) => void;

  reset: () => void;
  fillForm: (data: Partial<CategoryFormState>) => void;
  getFormData: () => CreateCategoryInput;
}

export const useCategoryFormStore = create<CategoryFormState>()(
  devtools((set, get) => ({
    name: '',
    type: 'expense',
    icon: '',

    setField: (field, value) => {
      set({ [field]: value });
    },

    reset: () => {
      set({ name: '', type: 'expense', icon: '' });
    },

    fillForm: (data) => {
      set({
        name: data.name ?? '',
        type: data.type ?? 'expense',
        icon: data.icon ?? '',
      });
    },

    getFormData: () => {
      const { name, type, icon } = get();
      return { name, type, icon };
    },
  }))
);
