'use client';

import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import TopNav from '@/components/common/TopNav';
import { ReactNode } from 'react';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <TopNav title='Budget Setting' />
      <DateNavigator withTransactionType={true} />
      <main className='flex-1 overflow-y-auto bg-gray-100'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
