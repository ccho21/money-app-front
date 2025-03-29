import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from '@/features/shared/api';
import { Category } from '@/features/categories/types';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  clear: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  devtools((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
      try {
        set({ isLoading: true, error: null });
        const res = await api<Category[]>('/categories');
        set({ categories: res });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : '카테고리 불러오기 실패',
        });
      } finally {
        set({ isLoading: false });
      }
    },

    clear: () => set({ categories: [], isLoading: false, error: null }),
  }))
);
