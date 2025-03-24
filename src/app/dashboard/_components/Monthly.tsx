'use client';

import MonthlyItem from '@/components/dashboard/MonthlyItem';
import YearNavigator from '@/components/ui/YearNavigator';
import { eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import { useState } from 'react';

export default function Monthly() {
  const [year, setYear] = useState(new Date().getFullYear());

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 11, 31)),
  });

  return (
    <div className="p-4">
      <YearNavigator initialYear={year} onChange={setYear} />

      <div className="mt-4 space-y-3">
        {months.map((monthDate) => (
          <MonthlyItem
            key={monthDate.toISOString()}
            date={monthDate}
            income={0}
            expense={0}
          />
        ))}
      </div>
    </div>
  );
}
