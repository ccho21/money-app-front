// 📄 src/stores/useDateFilterStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DateFilterStore {
  state: {
    date: Date;
  };
  actions: {
    setDate: (date: Date) => void;
    getDate: () => Date;
    getYear: () => string;
    getMonth: () => string;
  };
}

export const useDateFilterStore = create<DateFilterStore>()(
  devtools(
    (set, get) => ({
      state: {
        date: new Date(),
      },
      actions: {
        setDate: (date) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                date,
              },
            }),
            false,
            'dateFilter/setDate'
          ),
        getDate: () => get().state.date,
        getYear: () => String(get().state.date.getFullYear()),
        getMonth: () => String(get().state.date.getMonth() + 1),
      },
    }),
    { name: 'useDateFilterStore' }
  )
);
