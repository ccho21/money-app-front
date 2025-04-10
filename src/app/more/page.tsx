'use client';

import {
  CalendarDays,
  ChevronRight,
  Rows3,
  LayoutDashboard,
  Wallet,
  Wallet2,
  Settings,
  PiggyBank,
  DollarSign,
  Menu,
  RotateCcw,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { useOptionModalStore, SettingKey } from '@/stores/useOptionModalStore';
import { usePanelStore } from '@/stores/usePanelStore';
import OptionSelectorModal from '@/components/ui/OptionSelectorModal';
import SlideInPanelRenderer from '@/components/common/SlideInPanelRenderer';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='mt-4'>
    <h3 className='text-xs text-muted font-semibold mb-2 px-4'>{title}</h3>
    <div className='space-y-[1px]'>{children}</div>
  </div>
);

const SettingItem = ({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className='flex items-center justify-between w-full px-4 py-3 bg-surface border-b border-border transition hover:bg-muted/10'
  >
    <div className='flex items-center gap-3'>
      {icon}
      <div className='text-left'>
        <p className='text-sm font-medium text-foreground'>{title}</p>
        {subtitle && (
          <p className='text-xs text-muted truncate w-[220px]'>{subtitle}</p>
        )}
      </div>
    </div>
    <ChevronRight size={16} className='text-muted' />
  </button>
);

export default function MorePage() {
  const router = useRouter();
  const {
    weeklyStartDay,
    inputOrder,
    theme,
    mainCurrency,
    subCurrency,
    startScreen,
    monthlyStartDate,
    setWeeklyStartDay,
    setInputOrder,
    setStartScreen,
  } = useUserSettingStore();

  const { currentModal, openModal, closeModal } = useOptionModalStore();
  const { openPanel } = usePanelStore();

  const valueMap: Record<
    'weeklyStartDay' | 'inputOrder' | 'startScreen',
    string
  > = {
    weeklyStartDay,
    inputOrder,
    startScreen,
  };

  const optionsMap = {
    weeklyStartDay: [
      { label: 'Sunday', value: 'sunday' },
      { label: 'Monday', value: 'monday' },
    ],
    inputOrder: [
      { label: 'Amount → Account → Category', value: 'amount-first' },
      { label: 'Account → Amount → Category', value: 'account-first' },
    ],
    startScreen: [
      { label: 'Daily View', value: 'daily' },
      { label: 'Calendar View', value: 'calendar' },
    ],
  } as const;

  const titleMap: Record<SettingKey, string> = {
    weeklyStartDay: 'Weekly Start Day',
    inputOrder: 'Input Order',
    theme: 'App Theme',
    mainCurrency: 'Main Currency',
    subCurrency: 'Sub Currency',
    startScreen: 'Start Screen',
    monthlyStartDate: 'Monthly Start Date',
  };

  return (
    <div className='bg-surface text-foreground min-h-screen py-3 pb-[10vh]'>
      {/* Transaction Settings */}
      <Section title='Transaction'>
        <SettingItem
          icon={<CalendarDays size={18} />}
          title='Monthly Start Date'
          subtitle={`${monthlyStartDate}일`}
          onClick={() => openPanel('monthlyStartDate')}
        />
        <SettingItem
          icon={<CalendarDays size={18} />}
          title='Weekly Start Day'
          subtitle={weeklyStartDay === 'sunday' ? 'Sunday' : 'Monday'}
          onClick={() => openModal('weeklyStartDay')}
        />
        <SettingItem
          icon={<Rows3 size={18} />}
          title='Input Order'
          subtitle={
            inputOrder === 'account-first'
              ? 'Account → Amount → Category'
              : 'Amount → Account → Category'
          }
          onClick={() => openModal('inputOrder')}
        />
        <SettingItem
          icon={<LayoutDashboard size={18} />}
          title='Start Screen'
          subtitle={startScreen === 'daily' ? 'Daily View' : 'Calendar View'}
          onClick={() => openModal('startScreen')}
        />
      </Section>

      {/* Category & Account Settings */}
      <Section title='Category & Accounts'>
        <SettingItem
          icon={<Wallet size={18} />}
          title='Income Category'
          onClick={() => router.push('/category')}
        />
        <SettingItem
          icon={<Wallet2 size={18} />}
          title='Expense Category'
          onClick={() => router.push('/category')}
        />
        <SettingItem
          icon={<Settings size={18} />}
          title='Account Group'
          subtitle='CASH / CARD / BANK'
          onClick={() => openPanel('accountGroup')}
        />
        <SettingItem
          icon={<Settings size={18} />}
          title='Account Setting'
          onClick={() => router.push('/account')}
        />
        <SettingItem
          icon={<PiggyBank size={18} />}
          title='Budget Setting'
          onClick={() => router.push('/budget/settings')}
        />
      </Section>

      {/* General Settings */}
      <Section title='General'>
        <SettingItem
          icon={<DollarSign size={18} />}
          title='Main Currency'
          subtitle={mainCurrency}
          onClick={() => openPanel('mainCurrency')}
        />
        <SettingItem
          icon={<DollarSign size={18} />}
          title='Sub Currency'
          subtitle={subCurrency || 'None'}
          onClick={() => openPanel('subCurrency')}
        />
        <SettingItem
          icon={<Menu size={18} />}
          title='Style / Theme'
          subtitle={theme.charAt(0).toUpperCase() + theme.slice(1)}
          onClick={() => openPanel('themeSetting')}
        />
        <SettingItem
          icon={<RotateCcw size={18} />}
          title='Backup / Reset'
          subtitle='Export / Import / Reset'
          onClick={() => openPanel('backupReset')}
        />
      </Section>

      {/* Panels & Modals */}
      <SlideInPanelRenderer />

      <OptionSelectorModal
        isOpen={currentModal !== null}
        title={currentModal ? titleMap[currentModal] : ''}
        options={
          currentModal && currentModal in optionsMap
            ? [...optionsMap[currentModal as keyof typeof optionsMap]]
            : []
        }
        selected={
          currentModal && currentModal in valueMap
            ? String(valueMap[currentModal as keyof typeof valueMap])
            : ''
        }
        onSelect={(val: string) => {
          if (!currentModal) return;
          switch (currentModal) {
            case 'weeklyStartDay':
              setWeeklyStartDay(val as 'sunday' | 'monday');
              break;
            case 'inputOrder':
              setInputOrder(val as 'amount-first' | 'account-first');
              break;
            case 'startScreen':
              setStartScreen(val as 'daily' | 'calendar');
              break;
          }
          closeModal();
        }}
        onClose={closeModal}
      />
    </div>
  );
}
