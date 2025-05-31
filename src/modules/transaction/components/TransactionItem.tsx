'use client';

import { cn } from '@/modules/shared/lib/utils';
import { format } from 'date-fns';
import { TransactionItem as TxDTO } from '../types/types';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

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
      : tx.category?.name ?? 'Uncategorized';

  const accountLabel = tx.account?.name ?? '';
  const subtitle = [categoryLabel, accountLabel].filter(Boolean).join(' · ');

  return (
    <Card
      onClick={handleClick}
      data-slot='transaction-item'
      className={cn(
        'px-element py-compact shadow-2xs border-none rounded-none',
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
              variant='default'
              amount={tx.amount}
            />
            <div className='text-label text-muted-foreground'>
              {format(new Date(tx.date), 'hh:mm a')}
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
