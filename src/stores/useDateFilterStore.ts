// 📄 경로: src/stores/useDateFilterStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DateFilterState {
  date: Date;
  type: 'weekly' | 'monthly' | 'yearly';

  setDate: (date: Date) => void;
  setType: (type: 'weekly' | 'monthly' | 'yearly') => void;

  getDate: () => Date;
  getYear: () => string;
  getMonth: () => string;
}

export const useDateFilterStore = create<DateFilterState>()(
  devtools(
    (set, get) => ({
      date: new Date(),
      type: 'monthly',

      setDate: (date) => set({ date: date }, false, 'setDate'),
      setType: (type) => set({ type: type }, false, 'setType'),

      getDate: () => get().date,
      getYear: () => String(get().date.getFullYear()),
      getMonth: () => String(get().date.getMonth() + 1),
    }),
    { name: 'DateFilterStore' }
  )
);
