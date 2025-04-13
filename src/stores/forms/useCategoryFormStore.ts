// 📄 src/stores/category/categoryForm.store.ts

import { CategoryType, CreateCategoryInput } from '@/features/category/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryFormStore {
  state: {
    name: string;
    type: CategoryType;
    icon: string;
  };
  actions: {
    setField: <K extends keyof CategoryFormStore['state']>(
      key: K,
      value: CategoryFormStore['state'][K]
    ) => void;
    reset: () => void;
    fillForm: (data: Partial<CategoryFormStore['state']>) => void;
    getFormData: () => CreateCategoryInput;
  };
}

const initialFormState: CategoryFormStore['state'] = {
  name: '',
  type: 'expense',
  icon: '',
};

export const useCategoryFormStore = create<CategoryFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...initialFormState },
      actions: {
        setField: (key, value) =>
          set(
            (s) => ({
              state: { ...s.state, [key]: value },
            }),
            false,
            `categoryForm/setField:${key}`
          ),

        reset: () =>
          set(
            () => ({
              state: { ...initialFormState },
            }),
            false,
            'categoryForm/reset'
          ),

        fillForm: (data) =>
          set(
            () => ({
              state: {
                name: data.name ?? '',
                type: data.type ?? 'expense',
                icon: data.icon ?? '',
              },
            }),
            false,
            'categoryForm/fillForm'
          ),

        getFormData: () => {
          const { name, type, icon } = get().state;
          return { name, type, icon };
        },
      },
    }),
    { name: 'useCategoryFormStore' }
  )
);
