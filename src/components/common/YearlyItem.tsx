'use client';

import { format, parse, isValid, startOfYear, endOfYear } from 'date-fns';
import { useMemo } from 'react';

interface YearlyItemProps {
  date: string;
  income: number;
  expense: number;
  onClick: () => void;
}

export default function YearlyItem({
  date,
  income,
  expense,
  onClick,
}: YearlyItemProps) {
  const parsedDate = useMemo(() => {
    try {
      const d = parse(date, 'yyyy', new Date());
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  }, [date]);

  const label = parsedDate ? format(parsedDate, 'yyyy') : 'Invalid';
  const start = parsedDate ? format(startOfYear(parsedDate), 'MM-dd') : '??';
  const end = parsedDate ? format(endOfYear(parsedDate), 'MM-dd') : '??';
  const total = income - expense;

  if (!parsedDate) return null;

  return (
    <div className='border-b border-gray-200 dark:border-zinc-800 px-4'>
      <button
        onClick={onClick}
        className='w-full flex justify-between items-center py-3'
      >
        <div className='text-left'>
          <div className='text-base font-semibold text-black dark:text-white'>
            {label}
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            {start} ~ {end}
          </div>
        </div>

        <div className='text-right space-y-1'>
          <div className='flex justify-end gap-2 text-sm font-medium'>
            <span className='text-blue-500'>${income.toLocaleString()}</span>
            <span className='text-red-500'>${expense.toLocaleString()}</span>
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            Total ${total.toLocaleString()}
          </div>
        </div>
      </button>
    </div>
  );
}
