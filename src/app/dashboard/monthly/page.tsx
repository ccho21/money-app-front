'use client';

import { useState } from 'react';

import MonthlyItem from './_components/MonthlyItem';
import { useMonthlyGroupedTransactions } from './_components/useMonthlyGroupedTransactions';
import DateNavigator from '@/components/ui/DateNavigator';

export default function MonthlyPage() {
  const [date, setDate] = useState(new Date());

  const { groupedData } = useMonthlyGroupedTransactions(date.getFullYear());

  return (
    <div className='p-4'>
      <DateNavigator date={date} onChange={setDate} mode='year' />
      <div className='mt-4 space-y-3'>
        {groupedData.map((group) => {
          return (
            <MonthlyItem
              key={group.label}
              date={group.label}
              income={group.incomeTotal}
              expense={group.expenseTotal}
            />
          );
        })}
      </div>
    </div>
  );
}
