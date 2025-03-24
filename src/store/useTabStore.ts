import { create } from 'zustand';

interface TabState {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const useTabStore = create<TabState>((set) => ({
  currentTab: 'daily',
  setTab: (tab) => set({ currentTab: tab }),
}));
