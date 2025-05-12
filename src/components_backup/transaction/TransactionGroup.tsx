'use client';

import { cn } from '@/lib/utils';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';
import { CalendarDays } from 'lucide-react';
import TransactionItem from './TransactionItem';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import { Badge } from '@/components_backup/ui/badge';

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
  variant?: 'simple' | 'detailed';
}

export default function TransactionGroup({
  label,
  rangeStart,
  rangeEnd,
  groupIncome,
  groupExpense,
  group,
  onHeaderClick,
  onTransactionClick,
  showDateHeader = true,
  showRange = false,
  className,
  variant = 'simple',
}: TransactionGroupProps) {
  const { day, weekday } = getDayAndWeekdayFromUTC(label);
  const isDetailed = variant === 'detailed';

  return (
    <section className={cn('space-y-element', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => e.key === 'Enter' && onHeaderClick?.()}
          className={cn(
            'flex justify-between items-center',
            isDetailed
              ? 'px-component py-element bg-muted/40 rounded-card hover:bg-muted/50 transition-colors cursor-pointer'
              : 'px-component'
          )}
        >
          <div className='flex items-center gap-tight text-label text-muted-foreground'>
            <CalendarDays size={16} className='text-muted-foreground' />

            <span className='font-medium text-body text-foreground'>
              {isDetailed ? day : label}
            </span>

            {isDetailed && (
              <>
                <Badge>{weekday}</Badge>
                {showRange && rangeStart && rangeEnd && (
                  <span className='ml-tight text-caption bg-muted px-compact py-[2px] rounded-full'>
                    {rangeStart} ~ {rangeEnd}
                  </span>
                )}
              </>
            )}
          </div>

          {isDetailed && (
            <div className='flex items-center gap-tight text-label font-medium'>
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

      <div className='flex flex-col gap-compact'>
        {group.transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </div>
    </section>
  );
}
