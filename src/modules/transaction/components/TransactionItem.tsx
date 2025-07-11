'use client';

import { cn } from '@/modules/shared/util/style.utils';
import { TransactionItem as TxDTO } from '../types/types';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { formatLocalDateString } from '@/modules/shared/util/date.util';

interface Props {
  tx: TxDTO;
  onClick?: (tx: TxDTO) => void;
  showTransferLabel?: boolean;
  className?: string;
}

export default function TransactionItem({
  tx,
  onClick,
  showTransferLabel = true,
  className,
}: Props) {
  const isIncome = tx.type === 'income';
  // const isExpense = tx.type === 'expense';
  const isTransfer = tx.type === 'transfer';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(tx);
  };

  const categoryLabel =
    isTransfer && showTransferLabel
      ? 'Transfer'
      : tx.category?.name || 'Uncategorized'; // null-safe

  const accountLabel = tx.account?.name ?? '';
  const subtitle = [categoryLabel, accountLabel].filter(Boolean).join(' · ');

  return (
    <Card
      onClick={handleClick}
      data-slot='transaction-item'
      data-testid='transaction-item'
      className={cn(
        'px-element py-compact shadow-2xs border-none rounded-sm',  
        className
      )}
    >
      <CardContent className='p-0 flex items-center justify-between'>
        <div className='flex items-center gap-element'>
          <div className='space-y-tight'>
            <p className='text-body font-medium truncate text-foreground'>
              {tx.note || categoryLabel}
            </p>
            <p className='text-label text-muted-foreground'>{subtitle}</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className={cn('text-right space-y-tight text-body')}>
            <CurrencyDisplay
              isRecurring={tx.recurringId ? true : false}
              type={isIncome ? 'income' : 'expense'}
              amount={tx.amount}
            />
            <div className='text-label text-muted-foreground'>
              {tx.balanceAfter ? (
                <div>
                  <CurrencyDisplay
                    // type={isIncome ? 'income' : 'expense'}
                    amount={Math.abs(tx.balanceAfter)}
                    className='text-body'
                  />
                </div>
              ) : (
                formatLocalDateString(tx.date, 'hh:mm a')
              )}
            </div>
          </div>
          <div className='ml-3'>
            <ChevronRight className='text-primary h-5 w-5' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
