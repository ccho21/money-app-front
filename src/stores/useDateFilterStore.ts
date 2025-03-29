// 📄 경로: src/stores/useDateFilterStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DateFilterState {
  date: Date;

  setDate: (date: Date) => void;
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
      getDate: () => get().date,
      getYear: () => String(get().date.getFullYear()),
      getMonth: () => String(get().date.getMonth() + 1),
    }),
    { name: 'DateFilterStore' }
  )
);
