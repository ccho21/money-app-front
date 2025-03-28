'use client';

import {
  CalendarDays,
  Repeat,
  ClipboardCopy,
  Wallet,
  Wallet2,
  Settings,
  PiggyBank,
  RotateCcw,
  Lock,
  DollarSign,
  Bell,
  AppWindow,
  Languages,
  Globe,
} from 'lucide-react';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='mt-6'>
    <h3 className='text-xs text-gray-400 font-semibold mb-2 px-4'>{title}</h3>
    <div className='space-y-1'>{children}</div>
  </div>
);

const SettingItem = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className='flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800'>
    <div className='flex items-center gap-3'>
      {icon}
      <div>
        <p className='text-sm font-medium text-gray-900 dark:text-white'>
          {title}
        </p>
        {subtitle && (
          <p className='text-xs text-gray-400 truncate w-[220px]'>{subtitle}</p>
        )}
      </div>
    </div>
    {title === 'Passcode' && (
      <span className='text-xs text-red-500 font-semibold'>OFF</span>
    )}
    {title === 'Main Currency Setting' && (
      <span className='text-xs text-gray-400'>CAD($)</span>
    )}
  </div>
);

export default function MorePage() {
  return (
    <div className=''>
      <Section title='Trans.'>
        <SettingItem
          icon={<CalendarDays size={18} />}
          title='Transaction Settings'
          subtitle='Monthly Start Date, Carry-over Setting, Period, Other...'
        />
        <SettingItem icon={<Repeat size={18} />} title='Repeat Setting' />
        <SettingItem
          icon={<ClipboardCopy size={18} />}
          title='Copy-Paste Settings'
        />
      </Section>

      <Section title='Category/Accounts'>
        <SettingItem
          icon={<Wallet size={18} />}
          title='Income Category Setting'
        />
        <SettingItem
          icon={<Wallet2 size={18} />}
          title='Expenses Category Setting'
        />
        <SettingItem
          icon={<Settings size={18} />}
          title='Accounts Setting'
          subtitle='Account Group, Accounts, Include in totals, Transfer...'
        />
        <SettingItem icon={<PiggyBank size={18} />} title='Budget Setting' />
      </Section>

      <Section title='Settings'>
        <SettingItem
          icon={<RotateCcw size={18} />}
          title='Backup'
          subtitle='Export, Import, A complete reset'
        />
        <SettingItem icon={<Lock size={18} />} title='Passcode' />
        <SettingItem
          icon={<DollarSign size={18} />}
          title='Main Currency Setting'
        />
        <SettingItem
          icon={<DollarSign size={18} />}
          title='Sub Currency Setting'
        />
        <SettingItem icon={<Bell size={18} />} title='Alarm Setting' />
        <SettingItem icon={<AppWindow size={18} />} title='Application Icon' />
        <SettingItem icon={<Languages size={18} />} title='Language Setting' />
        <SettingItem icon={<Globe size={18} />} title='Allow ad tracking' />
      </Section>
    </div>
  );
}
