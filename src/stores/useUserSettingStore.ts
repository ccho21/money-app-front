import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type WeeklyStartDay = 'sunday' | 'monday';
export type InputOrder = 'amount-first' | 'account-first';
export type AppTheme = 'light' | 'dark' | 'system';
export type AppThemeColor =
  | 'white'
  | 'red'
  | 'pink'
  | 'green'
  | 'blue'
  | 'black';
export type CurrencyCode = 'CAD' | 'KRW' | 'USD' | '';

interface UserSettingStore {
  weeklyStartDay: WeeklyStartDay;
  inputOrder: InputOrder;
  theme: AppTheme;
  themeColor: AppThemeColor;
  mainCurrency: CurrencyCode;
  subCurrency: CurrencyCode;
  startScreen: 'daily' | 'calendar';
  monthlyStartDate: number;

  setWeeklyStartDay: (value: WeeklyStartDay) => void;
  setInputOrder: (value: InputOrder) => void;
  setTheme: (value: AppTheme) => void;
  setThemeColor: (value: AppThemeColor) => void;
  setMainCurrency: (value: CurrencyCode) => void;
  setSubCurrency: (value: CurrencyCode) => void;
  setStartScreen: (value: 'daily' | 'calendar') => void;
  setMonthlyStartDate: (value: number) => void;
}

export const useUserSettingStore = create<UserSettingStore>()(
  persist(
    devtools((set) => ({
      weeklyStartDay: 'sunday',
      inputOrder: 'amount-first',
      theme: 'system',
      themeColor: 'green',
      mainCurrency: 'CAD',
      subCurrency: '',
      startScreen: 'daily',
      monthlyStartDate: 1,

      setWeeklyStartDay: (v) => set({ weeklyStartDay: v }),
      setInputOrder: (v) => set({ inputOrder: v }),
      setTheme: (v) => set({ theme: v }),
      setThemeColor: (v) => set({ themeColor: v }),
      setMainCurrency: (v) => set({ mainCurrency: v }),
      setSubCurrency: (v) => set({ subCurrency: v }),
      setStartScreen: (v) => set({ startScreen: v }),
      setMonthlyStartDate: (v) => set({ monthlyStartDate: v }),
    })),
    {
      name: 'user-settings',
    }
  )
);
