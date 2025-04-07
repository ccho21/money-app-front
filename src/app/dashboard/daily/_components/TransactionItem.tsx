'use client';

import { Transaction } from '@/features/transaction/types';
import { cn } from '@/lib/utils';

interface Props {
  tx: Transaction;
  onClick?: (tx: Transaction) => void;
  showCategoryIcon?: boolean;
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

  return (
    <li
      onClick={handleClick}
      className={cn(
        'px-3 py-2.5 dark:border-zinc-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition',
        className
      )}
    >
      <div className='grid grid-cols-12 items-center gap-1'>
        {/* 카테고리 이름 or Transfer */}
        <div className='col-span-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 overflow-hidden'>
          {isTransfer && showTransferLabel ? (
            <span>Transfer</span>
          ) : (
            tx.category?.name && (
              <span>
                {tx.category.name.length > 5
                  ? tx.category.name.slice(0, 5) + '...'
                  : tx.category.name}
              </span>
            )
          )}
        </div>

        {/* 노트 + 계좌 이름 */}
        <div className='col-span-6 overflow-hidden'>
          <div className='text-sm text-gray-800 dark:text-gray-200 truncate'>
            {tx.note ||
              (isTransfer && `${tx.account?.name} → ${tx.toAccount?.name}`)}
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500 truncate'>
            {isTransfer
              ? `${tx.account?.name} → ${tx.toAccount?.name}`
              : tx.account?.name}
          </div>
        </div>

        {/* 금액 */}
        <div className='col-span-4 text-sm text-right'>
          {isIncome && (
            <span className='text-[#3C50E0]'>
              +₩{tx.amount.toLocaleString()}
            </span>
          )}
          {isExpense && (
            <span className='text-[#fb5c4c]'>
              -₩{tx.amount.toLocaleString()}
            </span>
          )}
          {isTransfer && (
            <span className='text-gray-600 dark:text-gray-300'>
              ₩{tx.amount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
