'use client';

import { cn } from '@/modules/shared/util/style.utils';
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
    <section className={cn('transaction-group', className)}>
      {showDateHeader && (
        <div
          role='button'
          tabIndex={0}
          onClick={onHeaderClick}
          onKeyDown={(e) => e.key === 'Enter' && onHeaderClick?.()}
          className='transaction-group-header'
        >
          <div className='flex items-center gap-element'>
            <span>{label}</span>

            {showRange && rangeStart && rangeEnd && (
              <span className='range-badge'>
                {rangeStart} ~ {rangeEnd}
              </span>
            )}
          </div>
        </div>
      )}

      <div className='transaction-group-list -mx-compact'>
        {group.transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} onClick={onTransactionClick} />
        ))}
      </div>
    </section>
  );
}
