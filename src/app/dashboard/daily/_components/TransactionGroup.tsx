'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { Transaction } from '@/features/transaction/types';
import TransactionItem from './TransactionItem';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';
import { PlusIcon, MinusIcon } from 'lucide-react';

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
    <div className={cn('', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onHeaderClick?.();
          }}
          className={cn(
            'w-full px-3 py-3 border-t border-b transition-colors duration-200',
            'border-gray-200 dark:border-zinc-700',
            onHeaderClick &&
              'hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer'
          )}
        >
          <div className='grid grid-cols-12 items-center'>
            {/* 날짜 + 요일 (좌측 8칸) */}
            <div className='col-span-8 flex items-center gap-2'>
              <span className='text-xl font-bold text-gray-900 dark:text-white'>
                {day}
              </span>
              <span className='px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300'>
                {weekday}
              </span>
              {showRange && rangeStart && rangeEnd && (
                <span className='ml-2 text-xs text-gray-500 dark:text-gray-400'>
                  {rangeStart} ~ {rangeEnd}
                </span>
              )}
            </div>

            {/* 수입/지출 (우측 4칸, 2:2 분할) */}
            <div className='col-span-4 grid grid-cols-2 gap-1 justify-end text-sm font-medium text-right text-gray-800 dark:text-gray-200'>
              <span className='inline-flex items-center text-blue-600'>
                <PlusIcon size={13} />
                <span>{formatCurrency(incomeTotal)}</span>
              </span>
              <span className='inline-flex items-center text-red-400 text-right justify-end'>
                <MinusIcon size={13} />
                <span>{formatCurrency(expenseTotal)}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 거래 리스트 */}
      <ul className='mt-3 space-y-2'>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </div>
  );
}
