'use client';

import { cn } from '@/lib/utils';
import { Transaction } from '@/features/transaction/types';
import TransactionItem from './TransactionItem';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';

interface TransactionGroupProps {
  label: string;
  rangeStart?: string;
  rangeEnd?: string;
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
  onTransactionClick?: (tx: Transaction) => void;
  onHeaderClick?: () => void;
  showDateHeader?: boolean;
  showRange?: boolean;
  className?: string;
}

export default function TransactionGroup({
  label,
  rangeStart,
  rangeEnd,
  incomeTotal,
  expenseTotal,
  transactions,
  onTransactionClick,
  onHeaderClick,
  showDateHeader = true,
  showRange = false,
  className,
}: TransactionGroupProps) {
  const { day, weekday } = getDayAndWeekdayFromUTC(label);

  return (
    <div className={cn('mb-4', className)} onClick={onHeaderClick}>
      {/* 날짜 or 범위 헤더 */}
      {showDateHeader && (
        <div
          className={cn(
            'grid grid-cols-12 items-center px-3 py-2.5 cursor-pointer transition-colors duration-200 border hover:bg-zinc-50 dark:hover:bg-zinc-900 border-t border-b border-gray-300 dark:border-gray-700 border-x-0'
          )}
        >
          {/* 날짜 */}
          <div className='col-span-1 text-lg font-bold text-gray-900 dark:text-white'>
            {day}
          </div>

          {/* 요일 뱃지 */}
          <div className='col-span-1'>
            <span className='inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300'>
              {weekday}
            </span>
          </div>

          <div className='col-span-4'>
            {showRange && rangeStart && rangeEnd && (
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {rangeStart} ~ {rangeEnd}
              </span>
            )}
          </div>

          {/* 수입/지출 요약 */}
          <div className='col-span-3 text-sm text-right text-[#3C50E0]'>
            +₩{incomeTotal.toLocaleString()}
          </div>
          <div className='col-span-3 text-sm text-right text-[#fb5c4c]'>
            -₩{expenseTotal.toLocaleString()}
          </div>
        </div>
      )}

      {/* 거래 리스트 */}
      <ul className='mt-2 space-y-2'>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </div>
  );
}
