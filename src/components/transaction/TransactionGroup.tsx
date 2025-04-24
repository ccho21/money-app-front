// 📄 src/components/common/TransactionGroup.tsx
'use client';

import { cn } from '@/lib/utils';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { getDayAndWeekdayFromUTC } from '@/lib/date.util';
import {
  CalendarDaysIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
} from 'lucide-react';
import TransactionItem from './TransactionItem';
import CurrencyDisplay from '../ui/check/CurrencyDisplay';
import { StatsCategoryPeriodDTO } from '@/modules/stats/types';

interface TransactionGroupProps {
  label: string;
  rangeStart?: string;
  rangeEnd?: string;
  groupIncome: number;
  groupExpense: number;
  group?: TransactionGroupItemDTO;
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
            'w-full px-3 py-3 border-b transition-colors duration-150',
            'border-border dark:border-zinc-700',
            onHeaderClick && 'hover:bg-muted/5 cursor-pointer'
          )}
        >
          <div className='grid grid-cols-12 items-center'>
            {/* 좌측 날짜 */}
            <div className='col-span-8 flex items-center gap-2'>
              <span className='text-sm font-semibold text-foreground flex items-center gap-1'>
                {/* 더 작고 플랫한 아이콘 */}
                <span className='text-sm font-semibold text-foreground flex items-center gap-1'>
                  {/* ✅ Lucide calendar icon 사용 */}
                  <CalendarDaysIcon
                    size={16}
                    className='text-muted-foreground'
                  />
                  <span>{day}</span>
                </span>
              </span>

              {/* 요일: 라운드 제거, 강조 제거 */}
              <span className='px-2 py-0.5 text-xs font-medium bg-border text-muted-foreground rounded-md'>
                {weekday}
              </span>

              {showRange && rangeStart && rangeEnd && (
                <span className='px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full'>
                  {rangeStart} ~ {rangeEnd}
                </span>
              )}
            </div>

            {/* 우측: 수입/지출 요약 */}
            <div className='col-span-4 flex justify-end items-center gap-2 text-sm font-medium text-right'>
              <span className='inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary rounded-sm'>
                <ArrowUpFromLine size={14} className='mr-1' />
                <CurrencyDisplay amount={groupIncome} />
              </span>
              <span className='inline-flex items-center px-2 py-0.5 bg-error/10 text-error rounded-sm'>
                <ArrowDownToLine size={14} className='mr-1' />
                <CurrencyDisplay amount={groupExpense} />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 거래 리스트 */}
      <ul className='mt-3 space-y-2'>
        {group?.transactions.map((tx: TransactionDetailDTO) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </ul>
    </div>
  );
}
