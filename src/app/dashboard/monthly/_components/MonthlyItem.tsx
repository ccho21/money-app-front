'use client';

import { format, startOfMonth, endOfMonth } from 'date-fns';

interface MonthlyItemProps {
  date: string;
  income: number;
  expense: number;
}

export default function MonthlyItem({ date, income, expense }: MonthlyItemProps) {
  const total = income - expense;
  const label = format(date, 'MMM'); // Jan, Feb, ...
  const start = format(startOfMonth(date), 'MM-dd');
  const end = format(endOfMonth(date), 'MM-dd');

  const totalColor =
    total > 0 ? 'text-blue-500' : total < 0 ? 'text-red-500' : 'text-gray-400';

  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-zinc-800">
      <div>
        <div className="text-base font-medium">{label}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{start} ~ {end}</div>
      </div>

      <div className="text-right text-sm space-y-0.5">
        <div>
          <span className="text-blue-500">₩{income.toLocaleString()}</span>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-red-500">₩{expense.toLocaleString()}</span>
        </div>
        <div className={`text-xs ${totalColor}`}>
          Total ₩{total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
