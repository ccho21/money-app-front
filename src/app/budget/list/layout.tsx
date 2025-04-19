'use client';

import DateNavigator from '@/components/ui/check/DateNavigator';
import { ReactNode } from 'react';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full bg-surface'>
      <DateNavigator withTransactionType={true} />
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
