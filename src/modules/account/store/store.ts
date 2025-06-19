import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountStoreState {
  clear: () => void;
}

export const useAccountStore = create<AccountStoreState>()(
  devtools((set) => ({
    clear: () => set({}),
  }))
);
