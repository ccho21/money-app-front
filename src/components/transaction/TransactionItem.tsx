'use client';

import { TransactionDetailDTO } from '@/features/transaction/types';
import { cn } from '@/lib/utils';
import { PlusIcon, MinusIcon } from 'lucide-react';
import CurrencyDisplay from '../ui/check/CurrencyDisplay';

interface Props {
  tx: TransactionDetailDTO;
  onClick?: (tx: TransactionDetailDTO) => void;
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
  const isExpense = tx.type === 'expense';
  const isTransfer = tx.type === 'transfer';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(tx);
  };

  const renderAmount = () => {
    if (isIncome) {
      return (
        <span className='inline-flex items-center text-primary'>
          <PlusIcon size={13} />
          <CurrencyDisplay amount={tx.amount} />
        </span>
      );
    }

    if (isExpense || isTransfer) {
      return (
        <span className='inline-flex items-center text-error'>
          <MinusIcon size={13} />
          <CurrencyDisplay amount={tx.amount} />
        </span>
      );
    }

    return null;
  };

  const categoryLabel =
    isTransfer && showTransferLabel
      ? 'Transfer'
      : tx.category?.name ?? 'No category';

  return (
    <li
      onClick={handleClick}
      className={cn(
        'px-3 py-2 cursor-pointer transition-colors hover:bg-muted/10 dark:hover:bg-zinc-800',
        className
      )}
    >
      <div className='grid grid-cols-12 gap-1 items-start'>
        {/* 1. Account (col-span-2) */}
        <div className='col-span-2 text-xs text-muted font-medium truncate pt-[2px]'>
          {tx.account?.name}
        </div>

        {/* 2. Note (bold) or Category (bold/secondary) */}
        <div className='col-span-7 overflow-hidden'>
          {tx.note ? (
            <>
              <div className='text-sm font-medium text-foreground truncate'>
                {tx.note}
              </div>
              <div className='text-xs text-muted truncate'>{categoryLabel}</div>
            </>
          ) : (
            <div className='text-sm font-medium text-foreground truncate'>
              {categoryLabel}
            </div>
          )}
        </div>

        {/* 3. Amount */}
        <div className='col-span-3 flex justify-end items-center text-sm font-medium text-right'>
          {renderAmount()}
        </div>
      </div>
    </li>
  );
}
