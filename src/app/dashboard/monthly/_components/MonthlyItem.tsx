'use client';

import { TransactionSummary } from '@/features/transaction/types';
import { format, startOfMonth, endOfMonth, parse } from 'date-fns';

interface MonthlyItemProps {
  date: string;
  income: number;
  expense: number;
  open: boolean;
  weeklyData: TransactionSummary[];
  onToggle: () => void;
}

export default function MonthlyItem({
  date,
  income,
  expense,
  open,
  weeklyData,
  onToggle,
}: MonthlyItemProps) {
  const total = income - expense;

  const parsedDate = parse(date, 'yyyy-MM', new Date());
  const label = format(parsedDate, 'MMM');
  const start = format(startOfMonth(parsedDate), 'MM-dd');
  const end = format(endOfMonth(parsedDate), 'MM-dd');

  return (
    <div className='border-b border-gray-200 dark:border-zinc-800 px-4'>
      {/* 아코디언 헤더 */}
      <button
        onClick={onToggle}
        className='w-full flex justify-between items-center py-3'
      >
        {/* Left: Month Label */}
        <div className='text-left'>
          <div className='text-base font-semibold text-black dark:text-white'>
            {label}
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            {start} ~ {end}
          </div>
        </div>

        {/* Right: Income / Expense / Total */}
        <div className='text-right space-y-1'>
          <div className='flex justify-end gap-2 text-sm font-medium'>
            <span className='text-blue-500'>₩{income.toLocaleString()}</span>
            <span className='text-red-500'>₩{expense.toLocaleString()}</span>
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            Total ₩{total.toLocaleString()}
          </div>
        </div>
      </button>

      {/* 아코디언 내용 - 주차별 요약 */}
      {open && weeklyData.length > 0 && (
        <div className='px-2 pb-3 text-sm text-gray-600 dark:text-gray-400 space-y-2'>
          {weeklyData.map((week, idx) => (
            <div
              key={idx}
              className='flex justify-between border-b border-gray-100 dark:border-zinc-700 pb-1'
            >
              <span className='text-xs text-gray-500'>
                {format(week.rangeStart, 'MM-dd')} -{' '}
                {format(week.rangeEnd, 'MM-dd')}
              </span>
              <div className='flex gap-2 text-sm'>
                {week.incomeTotal > 0 && (
                  <span className='text-blue-500'>
                    ₩{week.incomeTotal.toLocaleString()}
                  </span>
                )}
                {week.expenseTotal > 0 && (
                  <span className='text-red-500'>
                    ₩{week.expenseTotal.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
