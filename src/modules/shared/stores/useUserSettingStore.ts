import {
  AppTheme,
  AppThemeColor,
  CurrencyCode,
  InputOrder,
  StartPage,
  WeeklyStartDay,
} from '@/modules/settings/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserSettingStore {
  weeklyStartDay: WeeklyStartDay;
  inputOrder: InputOrder;
  theme: AppTheme;
  themeColor: AppThemeColor;
  mainCurrency: CurrencyCode;
  startPage: StartPage;
  monthlyStartDate: number;

  setWeeklyStartDay: (value: WeeklyStartDay) => void;
  setInputOrder: (value: InputOrder) => void;
  setTheme: (value: AppTheme) => void;
  setThemeColor: (value: AppThemeColor) => void;
  setMainCurrency: (value: CurrencyCode) => void;
  setSubCurrency: (value: CurrencyCode) => void;
  setStartPage: (value: StartPage) => void;
  setMonthlyStartDate: (value: number) => void;
  getSubtitleMap: () => Map<string, string>;
}

const defaultState = {
  weeklyStartDay: 'sunday' as WeeklyStartDay,
  inputOrder: 'amount-first' as InputOrder,
  theme: 'system' as AppTheme,
  themeColor: 'green' as AppThemeColor,
  mainCurrency: 'CAD' as CurrencyCode,
  subCurrency: '' as CurrencyCode,
  startPage: 'list' as 'list' | 'calendar',
  monthlyStartDate: 1,
};

export const useUserSettingStore = create<UserSettingStore>()(
  persist(
    devtools((set, get) => ({
      ...defaultState,

      setWeeklyStartDay: (v) => set({ weeklyStartDay: v }),
      setInputOrder: (v) => set({ inputOrder: v }),
      setTheme: (v) => set({ theme: v }),
      setThemeColor: (v) => set({ themeColor: v }),
      setMainCurrency: (v) => set({ mainCurrency: v }),
      setStartPage: (v) => set({ startPage: v }),
      setMonthlyStartDate: (v) => set({ monthlyStartDate: v }),
      getSubtitleMap: () => {
        const state = get();
        const map = new Map<string, string>();

        map.set(
          'themeSetting',
          `${capitalize(state.theme)} (${capitalize(state.themeColor)})`
        );
        map.set(
          'weeklyStartDay',
          state.weeklyStartDay === 'sunday' ? 'Sunday' : 'Monday'
        );
        map.set(
          'inputOrder',
          state.inputOrder === 'amount-first' ? 'Amount First' : 'Memo First'
        );
        map.set('mainCurrency', state.mainCurrency);
        map.set('startPage', capitalize(state.startPage));
        map.set('monthlyStartDate', `Every ${state.monthlyStartDate}`);

        return map;
      },
    })),
    {
      name: 'user-settings',
    }
  )
);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
