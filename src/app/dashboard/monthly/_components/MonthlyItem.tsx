'use client';

import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MonthlyItemProps {
  date: string;
  income: number;
  expense: number;
  open: boolean;
  onToggle: () => void;
}

export default function MonthlyItem({
  date,
  income,
  expense,
  open,
  onToggle,
}: MonthlyItemProps) {
  const total = income - expense;
  const label = format(date, 'MMM'); // Jan, Feb, ...
  const start = format(startOfMonth(date), 'MM-dd');
  const end = format(endOfMonth(date), 'MM-dd');

  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 px-4">
      {/* 아코디언 헤더 */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3"
      >
        {/* Left: Month Label */}
        <div className="text-left">
          <div className="text-base font-semibold text-black dark:text-white">
            {label}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {start} ~ {end}
          </div>
        </div>

        {/* Right: Income / Expense / Total */}
        <div className="text-right space-y-1">
          <div className="flex justify-end gap-2 text-sm font-medium">
            <span className="text-blue-500">
              ₩{income.toLocaleString()}
            </span>
            <span className="text-red-500">
              ₩{expense.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Total ₩{total.toLocaleString()}
          </div>
        </div>
      </button>

      {/* 아코디언 내용 */}
      {open && (
        <div className="px-2 pb-3 text-sm text-gray-600 dark:text-gray-400">
          상세 내역이 여기에 들어갑니다.
        </div>
      )}
    </div>
  );
}
