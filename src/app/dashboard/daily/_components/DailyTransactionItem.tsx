// 📄 경로: src/components/ui/DailyTransactionItem.tsx
'use client';

import { Transaction } from '@/features/transaction/types';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  const isIncome = tx.type === 'income';

  const amountColor = isIncome
    ? 'text-[#3C50E0]' // TailAdmin primary 파랑
    : 'text-[#F04438]'; // TailAdmin warning 오렌지

  return (
    <li className='px-3 py-2.5 border-b border-gray-200 dark:border-zinc-700'>
      <div className='grid grid-cols-12 items-center'>
        {/* 카테고리 아이콘 */}
        <div className='col-span-2 text-2xl text-gray-400 dark:text-gray-500'>
          {tx.category?.icon}
        </div>

        {/* note + account */}
        <div className='col-span-4 overflow-hidden'>
          <div className='text-sm text-gray-800 dark:text-gray-200 truncate'>
            {tx.note}
          </div>
          <div className='text-xs text-gray-400 text-muted-foreground truncate'>
            {'card'}
          </div>
        </div>

        {/* 금액 */}
        <div className={`col-span-3 text-sm text-right ${amountColor}`}>
          {isIncome ? '+' : '-'}₩{tx.amount.toLocaleString()}
        </div>
        <div className='col-span-3' />
      </div>
    </li>
  );
}
