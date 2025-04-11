// 📄 src/components/common/TransactionGroup.tsx
'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { Transaction, TransactionSummary } from '@/features/transaction/types';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';
import { PlusIcon, MinusIcon } from 'lucide-react';
import TransactionItem from './TransactionItem';

interface TransactionGroupProps {
  label: string;
  rangeStart?: string;
  rangeEnd?: string;
  incomeTotal: number;
  expenseTotal: number;
  group: TransactionSummary;
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
  group,
  onTransactionClick,
  onHeaderClick,
  showDateHeader = true,
  showRange = false,
  className,
}: TransactionGroupProps) {
  const { day, weekday } = getDayAndWeekdayFromUTC(label);

  return (
    <div className={cn('bg-surface', className)}>
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
            'border-border dark:border-zinc-700',
            onHeaderClick &&
              'hover:bg-muted/10 dark:hover:bg-zinc-800 cursor-pointer'
          )}
        >
          <div className='grid grid-cols-12 items-center'>
            {/* 날짜 + 요일 (좌측 8칸) */}
            <div className='col-span-8 flex items-center gap-2'>
              <span className='text-md font-bold text-foreground'>{day}</span>
              <span className='px-2 py-0.5 text-xs rounded-full bg-border text-muted-foreground dark:bg-zinc-70'>
                {weekday}
              </span>
              {showRange && rangeStart && rangeEnd && (
                <span className='ml-2 text-xs text-muted dark:text-muted-foreground'>
                  {rangeStart} ~ {rangeEnd}
                </span>
              )}
            </div>

            {/* 수입/지출 (우측 4칸, 2:2 분할) */}
            <div className='col-span-4 grid grid-cols-2 gap-1 justify-end text-sm font-medium text-right'>
              <span className='inline-flex items-center text-primary'>
                <PlusIcon size={13} />
                <span>{formatCurrency(incomeTotal)}</span>
              </span>
              <span className='inline-flex items-center text-error text-right justify-end'>
                <MinusIcon size={13} />
                <span>{formatCurrency(expenseTotal)}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 거래 리스트 */}
      <ul className='mt-3 space-y-2'>
        {group.transactions.map((tx: Transaction) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </div>
  );
}
