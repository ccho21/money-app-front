'use client';

import { useRouter } from 'next/navigation';
import { Transaction } from '@/features/transaction/types';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { ArrowLeftRight, LucideIcon, icons } from 'lucide-react';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  const router = useRouter();
  const isIncome = tx.type === 'income';
  const isExpense = tx.type === 'expense';
  const isTransfer = tx.type === 'transfer';

  const {
    actions: { setSelectedTransaction },
  } = useTransactionStore();

  const incomeColor = 'text-[#3C50E0]'; // TailAdmin primary
  const expenseColor = 'text-[#fb5c4c]'; // TailAdmin warning

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  // 카테고리 아이콘 처리
  const Icon =
    tx.category?.icon && icons[tx.category.icon as keyof typeof icons]
      ? (icons[tx.category.icon as keyof typeof icons] as LucideIcon)
      : null;

  return (
    <li
      onClick={handleClick}
      className='px-3 py-2.5 dark:border-zinc-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition'
    >
      <div className='grid grid-cols-12 items-center gap-1'>
        {/* 아이콘 or Transfer 라벨 */}
        <div className='col-span-2 text-xs text-gray-400 dark:text-gray-500 overflow-hidden flex items-center gap-1'>
          {isTransfer ? (
            <>
              <span>Transfer</span>
            </>
          ) : tx.category ? (
            <>
              <span>
                {tx.category.name.length > 5
                  ? tx.category.name.slice(0, 5) + '...'
                  : tx.category?.name}
              </span>
            </>
          ) : null}
        </div>

        {/* 메모 + 계좌 (span 확장됨) */}
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
            <span className={incomeColor}>+₩{tx.amount.toLocaleString()}</span>
          )}
          {isExpense && (
            <span className={expenseColor}>-₩{tx.amount.toLocaleString()}</span>
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
