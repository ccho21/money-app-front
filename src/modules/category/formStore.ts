// 파일: src/modules/category/formStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  CategoryType,
  CategoryCreateRequestDTO,
  CategoryUpdateRequestDTO,
} from './types';

type Mode = 'new' | 'edit';

interface CategoryFormState {
  mode: Mode;
  name: string;
  type: CategoryType;
  icon: string;
  color?: string;
}

interface CategoryFormActions {
  setField: <K extends keyof CategoryFormState>(
    key: K,
    value: CategoryFormState[K]
  ) => void;
  setAllFields: (data: Partial<CategoryFormState>) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
  getCreateFormData: () => CategoryCreateRequestDTO;
  getUpdateFormData: () => CategoryUpdateRequestDTO;
}

const initialState: CategoryFormState = {
  mode: 'new',
  name: '',
  type: 'expense',
  icon: '',
  color: undefined,
};

export const useCategoryFormStore = create<
  CategoryFormState & CategoryFormActions
>()(
  devtools((set, get) => ({
    ...initialState,

    setField: (key, value) => set({ [key]: value }),
    setAllFields: (data) => set({ ...data }),
    setMode: (mode) => set({ mode }),
    reset: () => set(initialState),

    getCreateFormData: () => {
      const { name, type, icon, color } = get();
      return { name, type, icon, color };
    },

    getUpdateFormData: () => {
      const { name, type, icon, color } = get();
      const dto: CategoryUpdateRequestDTO = {};
      if (name) dto.name = name;
      if (type) dto.type = type;
      if (icon) dto.icon = icon;
      if (color) dto.color = color;
      return dto;
    },
  }))
);
