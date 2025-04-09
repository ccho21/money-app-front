import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type PanelType =
  | 'monthlyStartDate'
  | 'categorySetting'
  | 'accountSetting'
  | 'themeSetting'
  | 'accountGroup'
  | 'mainCurrency'
  | 'subCurrency'
  | 'backupReset'
  | null;

interface PanelStore {
  currentPanel: PanelType;
  openPanel: (panel: PanelType) => void;
  closePanel: () => void;
}

export const usePanelStore = create<PanelStore>()(
  devtools(
    (set) => ({
      currentPanel: null,
      openPanel: (panel) => set({ currentPanel: panel }),
      closePanel: () => set({ currentPanel: null }),
    }),
    { name: 'PanelStore' }
  )
);
