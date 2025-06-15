// 파일: src/modules/category/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CategoryDetail } from '../types/types';

interface CategoryStoreState {
  categories: CategoryDetail[];
  setCategories: (categories: CategoryDetail[]) => void;
  clear: () => void;
}

export const useCategoryStore = create<CategoryStoreState>()(
  devtools(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      clear: () => set({ categories: [] }),
    }),
    { name: 'useCategoryStore' }
  )
);
