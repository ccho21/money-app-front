import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type WeeklyStartDay = 'sunday' | 'monday';
export type InputOrder = 'amount-first' | 'account-first';
export type AppTheme = 'light' | 'dark' | 'system';
export type CurrencyCode = 'CAD' | 'KRW' | 'USD' | '';

interface UserSettingStore {
  // 상태
  weeklyStartDay: WeeklyStartDay;
  inputOrder: InputOrder;
  theme: AppTheme;
  mainCurrency: CurrencyCode;
  subCurrency: CurrencyCode;
  startScreen: 'daily' | 'calendar';
  monthlyStartDate: number;

  // setter
  setWeeklyStartDay: (value: WeeklyStartDay) => void;
  setInputOrder: (value: InputOrder) => void;
  setTheme: (value: AppTheme) => void;
  setMainCurrency: (value: CurrencyCode) => void;
  setSubCurrency: (value: CurrencyCode) => void;
  setStartScreen: (value: 'daily' | 'calendar') => void;
  setMonthlyStartDate: (value: number) => void;
}

export const useUserSettingStore = create<UserSettingStore>()(
  devtools(
    (set) => ({
      // 초기값
      weeklyStartDay: 'sunday',
      inputOrder: 'amount-first',
      theme: 'system',
      mainCurrency: 'CAD',
      subCurrency: '',
      startScreen: 'daily',
      monthlyStartDate: 1,

      // setter 구현
      setWeeklyStartDay: (v) => set({ weeklyStartDay: v }),
      setInputOrder: (v) => set({ inputOrder: v }),
      setTheme: (v) => set({ theme: v }),
      setMainCurrency: (v) => set({ mainCurrency: v }),
      setSubCurrency: (v) => set({ subCurrency: v }),
      setStartScreen: (v) => set({ startScreen: v }),
      setMonthlyStartDate: (v) => set({ monthlyStartDate: v }),
    }),
    { name: 'UserSettingStore' }
  )
);
