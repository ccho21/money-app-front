'use client';

import { useState } from 'react';
import { eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';

import YearNavigator from '@/components/ui/YearNavigator';
import MonthlyItem from './_components/MonthlyItem';
import { useMonthlyGroupedTransactions } from './_components/useMonthlyGroupedTransactions';

export default function MonthlyPage() {
  const [year, setYear] = useState(new Date().getFullYear());

  const { groupedData } = useMonthlyGroupedTransactions(year);

  return (
    <div className="p-4">
      <YearNavigator initialYear={year} onChange={setYear} />

      <div className="mt-4 space-y-3">
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
