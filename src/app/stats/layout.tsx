'use client';

import { useState } from 'react';
import { ReactNode } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';

export default function StatsLayout({ children }: { children: ReactNode }) {
  const [date, setDate] = useState(new Date());
  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];
  const [currentTab, setCurrentTab] = useState<string>('expense');
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <StatsHeader />
      <DateNavigator date={date} onChange={setDate} mode='year' />
      <TabMenu tabs={tabs} active={currentTab} onChange={setCurrentTab} />
      <main className='flex-1 overflow-y-auto bg-gray-100'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
