import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type WeeklyStartDay = 'sunday' | 'monday';
export type InputOrder = 'amount-first' | 'account-first';
export type StartScreen = 'daily' | 'calendar';
export type Theme = 'system' | 'light' | 'dark';

export type SettingValueMap = {
  weeklyStartDay: WeeklyStartDay;
  inputOrder: InputOrder;
  theme: Theme;
  mainCurrency: string;
  subCurrency: string;
  startScreen: StartScreen;
  monthlyStartDate: number;
};

export type SettingKey = keyof SettingValueMap;

interface OptionModalStore {
  currentModal: SettingKey | null;
  openModal: (modal: SettingKey) => void;
  closeModal: () => void;
}

export const useOptionModalStore = create<OptionModalStore>()(
  devtools(
    (set) => ({
      currentModal: null,
      openModal: (modal) => set({ currentModal: modal }),
      closeModal: () => set({ currentModal: null }),
    }),
    { name: 'OptionModalStore' }
  )
);
