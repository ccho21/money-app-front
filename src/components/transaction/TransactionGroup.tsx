'use client';

import { cn } from '@/lib/utils';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';
import { CalendarDaysIcon } from 'lucide-react';
import TransactionItem from './TransactionItem';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import Badge from '../ui/badge/Badge';

interface TransactionGroupProps {
  label: string;
  rangeStart?: string;
  rangeEnd?: string;
  groupIncome: number;
  groupExpense: number;
  group: TransactionGroupItemDTO;
  onTransactionClick?: (tx: TransactionDetailDTO) => void;
  onHeaderClick?: () => void;
  showDateHeader?: boolean;
  showRange?: boolean;
  className?: string;
  variant?: 'simple' | 'detailed'; // ✨ 스타일 전환용
}

export default function TransactionGroup({
  label,
  rangeStart,
  rangeEnd,
  groupIncome,
  groupExpense,
  group,
  onTransactionClick,
  onHeaderClick,
  showDateHeader = true,
  showRange = false,
  className,
  variant = 'simple', // ✨ default 스타일
}: TransactionGroupProps) {
  const { day, weekday } = getDayAndWeekdayFromUTC(label);

  const isDetailed = variant === 'detailed';

  return (
    <section className={cn('space-y-2', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => e.key === 'Enter' && onHeaderClick?.()}
          className={cn(
            'flex justify-between items-center',
            isDetailed
              ? 'px-4 py-2 rounded-xl bg-muted/40 hover:bg-muted/50 transition cursor-pointer'
              : 'px-4 pt-4'
          )}
        >
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <CalendarDaysIcon size={16} className='text-muted-foreground' />

            <span className='font-medium text-foreground'>
              {isDetailed ? day : label}
            </span>

            {isDetailed && (
              <>
                <Badge color='gray' size='sm'>
                  {weekday}
                </Badge>
                {showRange && rangeStart && rangeEnd && (
                  <span className='ml-2 text-caption bg-muted px-2 py-0.5 rounded-full'>
                    {rangeStart} ~ {rangeEnd}
                  </span>
                )}
              </>
            )}
          </div>

          {isDetailed && (
            <div className='flex items-center gap-2 text-sm font-medium'>
              <Badge color='primary'>
                <CurrencyDisplay
                  amount={groupIncome}
                  type='income'
                  variant='group'
                />
              </Badge>
              <Badge color='error'>
                <CurrencyDisplay
                  amount={groupExpense}
                  type='expense'
                  variant='group'
                />
              </Badge>
            </div>
          )}
        </div>
      )}

      <ul className='space-y-2 px-4 pb-4'>
        {group.transactions.map((tx: TransactionDetailDTO) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </section>
  );
}
