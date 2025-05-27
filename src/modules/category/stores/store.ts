// 파일: src/modules/category/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CategoryDetailDTO } from '../types/types';

interface CategoryStoreState {
  categories: CategoryDetailDTO[];
  setCategories: (categories: CategoryDetailDTO[]) => void;
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
