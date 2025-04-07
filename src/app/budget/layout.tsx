'use client';

import BottomTabBar from '@/components/common/BottomTabBar';
import { ReactNode } from 'react';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  console.log('####BUDGET LAYOUT');
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <main className='flex-1 overflow-y-auto bg-gray-100'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
