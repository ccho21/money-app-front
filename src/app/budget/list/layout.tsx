'use client';

import DateNavigator from '@/components/ui/DateNavigator';
import { ReactNode } from 'react';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <DateNavigator withTransactionType={true} />
      <main className='flex-1 overflow-y-auto bg-gray-100'>{children}</main>
    </div>
  );
}
