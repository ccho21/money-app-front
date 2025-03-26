import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Budget } from './types';
import { fetchBudgets, createBudget, updateBudget, deleteBudget } from './api';

interface BudgetState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  fetchBudgetsAction: () => Promise<void>;
  createBudgetAction: (data: { total: number }) => Promise<void>;
  updateBudgetAction: (id: string, data: { total?: number }) => Promise<void>;
  deleteBudgetAction: (id: string) => Promise<void>;
}

const useBudgetStore = create<BudgetState>()(
  devtools((set) => ({
    budgets: [],
    loading: false,
    error: null,

    // 예산 전체 조회
    fetchBudgetsAction: async () => {
      set({ loading: true, error: null });
      try {
        const data = await fetchBudgets();
        set({ budgets: data, loading: false });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : '예산 조회 실패',
          loading: false,
        });
      }
    },

    // 예산 생성
    createBudgetAction: async (data) => {
      set({ loading: true, error: null });
      try {
        const newBudget = await createBudget(data);
        set((state) => ({
          budgets: [...state.budgets, newBudget],
          loading: false,
        }));
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : '예산 생성 실패',
          loading: false,
        });
      }
    },

    // 예산 수정
    updateBudgetAction: async (id, data) => {
      set({ loading: true, error: null });
      try {
        const updatedBudget = await updateBudget(id, data);
        set((state) => ({
          budgets: state.budgets.map((b) => (b.id === id ? updatedBudget : b)),
          loading: false,
        }));
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : '예산 수정 실패',
          loading: false,
        });
      }
    },

    // 예산 삭제
    deleteBudgetAction: async (id) => {
      set({ loading: true, error: null });
      try {
        await deleteBudget(id);
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
          loading: false,
        }));
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : '예산 삭제 실패',
          loading: false,
        });
      }
    },
  }))
);

export default useBudgetStore;
