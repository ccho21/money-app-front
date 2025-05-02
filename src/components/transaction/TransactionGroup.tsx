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
}: TransactionGroupProps) {
  const { day, weekday } = getDayAndWeekdayFromUTC(label);

  return (
    <div className={cn('bg-surface rounded-card', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onHeaderClick?.();
          }}
          className={cn(
            'w-full border-b border-border transition-colors duration-150',
            'px-component py-element',
            onHeaderClick && 'hover:bg-muted/5 cursor-pointer'
          )}
        >
          <div className='grid grid-cols-12 items-center'>
            <div className='col-span-8 flex items-center gap-tight'>
              <span className='text-label font-semibold text-foreground flex items-center gap-tight'>
                <CalendarDaysIcon size={16} className='text-muted-foreground' />
                <span>{day}</span>
              </span>

              <Badge color='gray' size='sm'>
                {weekday}
              </Badge>

              {showRange && rangeStart && rangeEnd && (
                <span className='px-2 py-0.5 text-caption font-medium bg-muted text-muted-foreground rounded-full'>
                  {rangeStart} ~ {rangeEnd}
                </span>
              )}
            </div>

            <div className='col-span-4 flex justify-end items-center gap-tight text-label font-medium text-right'>
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
          </div>
        </div>
      )}

      <ul className='mt-element space-y-tight'>
        {group.transactions.map((tx: TransactionDetailDTO) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </div>
  );
}
