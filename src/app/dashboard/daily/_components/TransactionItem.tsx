'use client';

import { Transaction } from '@/features/transaction/types';
import { cn, formatCurrency } from '@/lib/utils';
import { PlusIcon, MinusIcon, ArrowRightLeftIcon } from 'lucide-react';

interface Props {
  tx: Transaction;
  onClick?: (tx: Transaction) => void;
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
    const amount = formatCurrency(tx.amount);

    if (isIncome)
      return (
        <span className='inline-flex items-center text-blue-600 dark:text-blue-400'>
          <PlusIcon size={13} />
          {amount}
        </span>
      );

    if (isExpense)
      return (
        <span className='inline-flex items-center text-red-500 dark:text-red-400'>
          <MinusIcon size={13} />
          {amount}
        </span>
      );

    return (
      <span className='inline-flex items-center text-gray-600 dark:text-gray-300'>
        <ArrowRightLeftIcon size={13} />
        {amount}
      </span>
    );
  };

  return (
    <li
      onClick={handleClick}
      className={cn(
        'px-3 py-2 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-zinc-800',
        className
      )}
    >
      <div className='grid grid-cols-12 gap-1 items-start'>
        {/* 좌측 10칸: 어카운트 + 노트 + 카테고리 */}
        <div className='col-span-10 overflow-hidden'>
          {/* 어카운트 + 노트 (1줄) */}
          <div className='flex items-center gap-1 text-sm text-gray-900 dark:text-gray-100 truncate leading-tight'>
            <span className='font-medium truncate text-gray-700 dark:text-gray-300'>
              {tx.account?.name}
            </span>
            {tx.note && (
              <span className='text-gray-500 dark:text-gray-400 truncate'>
                · {tx.note}
              </span>
            )}
          </div>

          {/* 카테고리 (2줄) */}
          <div className='text-xs text-gray-400 dark:text-gray-500 truncate'>
            {isTransfer && showTransferLabel ? 'Transfer' : tx.category?.name}
          </div>
        </div>

        {/* 우측 2칸: 금액 */}
        <div className='col-span-2 flex justify-end items-center text-sm font-medium text-right'>
          {renderAmount()}
        </div>
      </div>
    </li>
  );
}
