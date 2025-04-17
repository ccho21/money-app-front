// 📄 src/stores/category/category.store.ts

import { CategoryDTO } from '@/features/category/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryStore {
  state: {
    categories: CategoryDTO[];
  };
  actions: {
    setCategories: (categories: CategoryDTO[]) => void;
  };
}

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    (set) => ({
      state: {
        categories: [],
      },
      actions: {
        setCategories: (categories) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                categories,
              },
            }),
            false,
            'categories/setAll'
          ),
      },
    }),
    { name: 'useCategoryStore' }
  )
);
