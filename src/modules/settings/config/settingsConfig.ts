import { IconName } from '@/modules/shared/lib/iconMap';
import { signout } from '@/modules/auth/hooks';
import { PanelType } from '@/modules/settings/types/types';

export type SettingSection = 'transaction' | 'category' | 'general';

type BaseSettingItem = {
  key: string;
  title: string;
  icon: IconName;
  section: SettingSection;
  subtitle?: string;
  className?: string;
};

export type PanelSettingItem = BaseSettingItem & {
  type: 'panel';
  panel: PanelType;
};

export type LinkSettingItem = BaseSettingItem & {
  type: 'link';
  route: string;
};

export type ActionSettingItem = BaseSettingItem & {
  type: 'action';
  action: () => void | Promise<void>;
};

export type SettingItemConfig =
  | PanelSettingItem
  | LinkSettingItem
  | ActionSettingItem;

export const settingsConfig: SettingItemConfig[] = [
  // ──────────────── Transaction ────────────────
  {
    key: 'monthlyStartDate',
    title: 'Monthly Start Date',
    icon: 'calendarDays',
    type: 'panel',
    section: 'transaction',
    panel: 'monthlyStartDate',
  },
  {
    key: 'weeklyStartDay',
    title: 'Weekly Start Day',
    icon: 'calendarDays',
    type: 'panel',
    section: 'transaction',
    panel: 'weeklyStartDay',
  },
  {
    key: 'startPage',
    title: 'Start Page',
    icon: 'layoutDashboard',
    type: 'panel',
    section: 'transaction',
    panel: 'startPage',
  },

  // ──────────────── Category & Accounts ────────────────
  {
    key: 'category',
    title: 'Category',
    icon: 'wallet2',
    type: 'link',
    section: 'category',
    route: '/category',
  },
  // {
  //   key: 'accountGroup',
  //   title: 'Account Group',
  //   icon: 'settings',
  //   subtitle: 'CASH / CARD / BANK',
  //   type: 'panel',
  //   section: 'category',
  //   panel: 'accountGroup',
  // },
  {
    key: 'accountSetting',
    title: 'Account',
    icon: 'settings',
    type: 'link',
    section: 'category',
    route: '/account',
  },
  {
    key: 'budgetSetting',
    title: 'Budget',
    icon: 'piggyBank',
    type: 'link',
    section: 'category',
    route: '/budget',
  },

  // ──────────────── General ────────────────
  {
    key: 'mainCurrency',
    title: 'Main Currency',
    icon: 'dollarSign',
    type: 'panel',
    section: 'general',
    panel: 'mainCurrency',
  },
  {
    key: 'themeSetting',
    title: 'Style / Theme',
    icon: 'menu',
    type: 'panel',
    section: 'general',
    panel: 'themeSetting',
  },
  {
    key: 'backupReset',
    title: 'Backup / Reset',
    icon: 'rotateCcw',
    subtitle: 'Export / Import / Reset',
    type: 'panel',
    section: 'general',
    panel: 'backupReset',
  },
  {
    key: 'signOut',
    title: 'Sign Out',
    icon: 'logout',
    subtitle: 'Logout from your account',
    type: 'action',
    section: 'general',
    className: 'text-destructive',
    action: async () => {
      await signout();
    },
  },
];
