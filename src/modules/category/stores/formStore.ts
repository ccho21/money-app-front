import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CategoryCreateRequestDTO, CategoryType, CategoryUpdateRequestDTO } from '../types/types';

type Mode = 'new' | 'edit';

interface CategoryFormState {
  mode: Mode;
  name: string;
  type: CategoryType;
  icon?: string;
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
  icon: undefined,
  color: undefined,
};

export const useCategoryFormStore = create<
  CategoryFormState & CategoryFormActions
>()(
  devtools((set, get) => ({
    ...initialState,

    setField: (key, value) =>
      set((state) => ({
        ...state,
        [key]: value,
      })),

    setAllFields: (data) => {
      const safeData = Object.fromEntries(
        Object.entries(data).filter(([key]) => key in initialState)
      );
      set(safeData as Partial<CategoryFormState>);
    },

    setMode: (mode) => set({ mode }),

    reset: () => set({ ...initialState }),

    getCreateFormData: () => {
      const { name, type, icon, color } = get();
      return {
        name: name.trim(),
        type,
        icon: icon?.trim() || undefined,
        color: color?.trim() || undefined,
      };
    },

    getUpdateFormData: () => {
      const { name, type, icon, color } = get();
      const dto: CategoryUpdateRequestDTO = {};
      if (typeof name === 'string' && name.trim()) dto.name = name.trim();
      if (type === 'expense' || type === 'income') dto.type = type;
      if (typeof icon === 'string' && icon.trim()) dto.icon = icon.trim();
      if (typeof color === 'string' && color.trim()) dto.color = color.trim();
      return dto;
    },
  }))
);
