// 📄 src/components/common/TransactionItem.tsx
'use client';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';

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
      return <CurrencyDisplay amount={tx.amount} type='income' />;
    }

    if (isExpense) {
      return <CurrencyDisplay amount={tx.amount} type='expense' />;
    }

    if (isTransfer) {
      return <CurrencyDisplay amount={tx.amount} type='transfer' />;
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
        'px-element py-compact cursor-pointer transition-colors hover:bg-muted/10 dark:hover:bg-zinc-800',
        className
      )}
    >
      <div className='grid grid-cols-12 gap-tight items-start'>
        {/* 1. Account */}
        <div className='col-span-2 text-caption text-muted font-medium truncate pt-[2px]'>
          {tx.account?.name}
        </div>

        {/* 2. Note or Category */}
        <div className='col-span-7'>
          {tx.note ? (
            <>
              <div className='text-label font-medium text-foreground truncate'>
                {tx.note}
              </div>
              <div className='text-caption text-muted truncate'>{categoryLabel}</div>
            </>
          ) : (
            <div className='text-label font-medium text-foreground truncate'>
              {categoryLabel}
            </div>
          )}
        </div>

        {/* 3. Amount */}
        <div className='col-span-3 flex justify-end items-center text-label font-medium text-right'>
          {renderAmount()}
        </div>
      </div>
    </li>
  );
}
