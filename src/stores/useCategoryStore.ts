import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Category } from '@/features/category/types';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  setCategories: (data: Category[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  clear: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set) => ({
      categories: [],
      isLoading: false,
      error: null,

      setCategories: (data) => set({ categories: data }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (err) => set({ error: err }),

      clear: () => set({ categories: [], isLoading: false, error: null }),
    }),
    { name: 'CategoryStore' }
  )
);
