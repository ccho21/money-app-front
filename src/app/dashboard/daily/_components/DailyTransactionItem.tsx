// 📄 경로: src/components/ui/DailyTransactionItem.tsx
'use client';

import { Transaction } from '@/features/transaction/types';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  const isIncome = tx.type === 'income';

  const incomeColor = 'text-[#3C50E0]'; // TailAdmin primary
  const expenseColor = 'text-[#fb5c4c]'; // TailAdmin warning

  return (
    <li className='px-3 py-2.5 border-b border-gray-200 dark:border-zinc-700'>
      <div className='grid grid-cols-12 items-center'>
        {/* 아이콘 */}
        <div className='col-span-2 text-xs text-gray-400 dark:text-gray-500 overflow-hidden'>
          {tx.category && tx.category.name.length > 5
            ? tx.category.name.slice(0, 5) + '...'
            : tx.category.name}
        </div>

        {/* 메모 / 계좌 */}
        <div className='col-span-4 overflow-hidden'>
          <div className='text-sm text-gray-800 dark:text-gray-200 truncate'>
            {tx.note}
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500 truncate'>
            {(tx.account && tx.account.name) || tx.account.name}
          </div>
        </div>

        {/* 수입 (6~9 고정) */}
        <div className='col-span-3 text-sm text-right'>
          {isIncome && (
            <span className={`${incomeColor}`}>
              +₩{tx.amount.toLocaleString()}
            </span>
          )}
        </div>

        {/* 지출 (9~12 고정) */}
        <div className='col-span-3 text-sm text-right'>
          {!isIncome && (
            <span className={`${expenseColor}`}>
              -₩{tx.amount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
