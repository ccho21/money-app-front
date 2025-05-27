// 값 타입 정의
export type WeeklyStartDay = 'sunday' | 'monday';
export type InputOrder = 'amount-first' | 'account-first';
export type AppTheme = 'light' | 'dark' | 'system';
export type AppThemeColor = 'white' | 'red' | 'pink' | 'green' | 'blue' | 'black';
export type CurrencyCode = 'CAD' | 'KRW' | 'USD';

export type StartPage = 'list' | 'calendar';

// 실제 스토어에서 사용하는 설정 값들의 매핑
export type SettingValueMap = {
  weeklyStartDay: WeeklyStartDay;
  inputOrder: InputOrder;
  theme: AppTheme;
  themeColor: AppThemeColor;
  mainCurrency: CurrencyCode;
  subCurrency: CurrencyCode;
  startPage: StartPage;
  monthlyStartDate: number;
};

export type SettingKey = keyof SettingValueMap;

// 패널을 여는 타입 (패널이 필요한 key만 정의)
export type PanelType =
  | 'monthlyStartDate'
  | 'weeklyStartDay'
  | 'startPage'
  | 'themeSetting'
  | 'accountGroup'
  | 'mainCurrency'
  | 'subCurrency'
  | 'backupReset'
  | null;
