import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TabState {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const useTabStore = create<TabState>()(
  devtools(
    (set) => ({
      currentTab: "daily",
      setTab: (tab) => set({ currentTab: tab }),
    }),
    { name: "TabStore" }
  )
);