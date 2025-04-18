import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  CategoryType,
  CategoryCreateRequestDTO,
  CategoryUpdateRequestDTO,
} from '@/features/category/types';

interface CategoryFormState {
  name: string;
  type: CategoryType;
  icon: string;
  color?: string;
}

interface CategoryFormStore {
  state: CategoryFormState;
  actions: {
    setField: <K extends keyof CategoryFormState>(
      key: K,
      value: CategoryFormState[K]
    ) => void;
    setAllFields: (data: Partial<CategoryFormState>) => void;
    reset: () => void;
    getCreateFormData: () => CategoryCreateRequestDTO;
    getUpdateFormData: () => CategoryUpdateRequestDTO;
  };
}

const initialFormState: CategoryFormState = {
  name: '',
  type: 'expense',
  icon: '',
  color: undefined,
};

export const useCategoryFormStore = create<CategoryFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...initialFormState },

      actions: {
        //
        // Set a single field
        //
        setField: (key, value) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                [key]: value,
              },
            }),
            false,
            `categoryForm/setField:${key}`
          ),

        //
        // Set multiple fields at once
        //
        setAllFields: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                ...data,
              },
            }),
            false,
            'categoryForm/setAllFields'
          ),

        //
        // Reset form to initial state
        //
        reset: () =>
          set(
            () => ({
              state: { ...initialFormState },
            }),
            false,
            'categoryForm/reset'
          ),

        //
        // Return form data for category creation
        //
        getCreateFormData: (): CategoryCreateRequestDTO => {
          const { name, type, icon, color } = get().state;
          return { name, type, icon, color };
        },

        //
        // Return partial form data for category update
        //
        getUpdateFormData: (): CategoryUpdateRequestDTO => {
          const { name, type, icon, color } = get().state;
          return {
            ...(name && { name }),
            ...(type && { type }),
            ...(icon && { icon }),
            ...(color && { color }),
          };
        },
      },
    }),
    { name: 'useCategoryFormStore' }
  )
);
