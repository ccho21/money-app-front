import { TransactionCategory } from '@/features/transaction/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryState {
  categories: TransactionCategory[];
  selectedCategoryId: string | null;

  fetchCategories: () => Promise<void>;
  selectCategory: (id: string) => void;
  clear: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set) => ({
      categories: [],
      selectedCategoryId: null,

      fetchCategories: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!res.ok) throw new Error('카테고리 불러오기 실패');

          const data = await res.json();
          set({ categories: data }, false, 'fetchCategories:success');
        } catch (err) {
          console.error(err instanceof Error ? err.message : '카테고리 오류');
          set({ categories: [] }, false, 'fetchCategories:error');
        }
      },

      selectCategory: (id) =>
        set({ selectedCategoryId: id }, false, 'selectCategory'),

      clear: () =>
        set(
          { categories: [], selectedCategoryId: null },
          false,
          'clearCategoryState'
        ),
    }),
    { name: 'CategoryStore' }
  )
);
