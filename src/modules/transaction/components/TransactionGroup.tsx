'use client';

import { cn } from '@/lib/utils';
import TransactionItem from './TransactionItem';
import {
  TransactionGroupItem,
  TransactionItem as TransactionItemDTO,
} from '../types/types';

interface TransactionGroupProps {
  label: string;
  rangeStart?: string;
  rangeEnd?: string;
  group: TransactionGroupItem;
  onTransactionClick?: (tx: TransactionItemDTO) => void;
  onHeaderClick?: () => void;
  showDateHeader?: boolean;
  showRange?: boolean;
  className?: string;
}

export default function TransactionGroup({
  label,
  rangeStart,
  rangeEnd,
  group,
  onHeaderClick,
  onTransactionClick,
  showDateHeader = true,
  showRange = false,
  className,
}: TransactionGroupProps) {

  return (
    <section className={cn('', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => e.key === 'Enter' && onHeaderClick?.()}
          className='flex items-center justify-between px-1 text-xs font-medium text-muted-foreground cursor-pointer hover:bg-gray-50 py-1 rounded-md transition-colors'
        >
          {/* 왼쪽: 날짜 & 범위 */}
          <div className='flex items-center gap-2'>
            <span>{label}</span>
            {showRange && rangeStart && rangeEnd && (
              <span className='text-[11px] bg-gray-100 py-[1px] rounded-full text-muted-foreground px-element'>
                {rangeStart} ~ {rangeEnd}
              </span>
            )}
          </div>
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
