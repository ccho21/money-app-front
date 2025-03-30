// 📄 src/stores/category/category.store.ts

import { Category } from '@/features/category/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryState {
  categories: Category[];

  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>()(
  devtools((set) => ({
    categories: [],

    setCategories: (categories) => {
      set({ categories });
    },
  }))
);
