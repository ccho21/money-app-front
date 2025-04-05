'use client';

import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import TopNav from '@/components/common/TopNav';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  console.log('####BUDGET LAYOUT');
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <main className='flex-1 overflow-y-auto bg-gray-100'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
