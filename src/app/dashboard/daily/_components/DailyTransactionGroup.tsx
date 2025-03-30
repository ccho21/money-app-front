// 📄 경로: src/components/ui/DailyTransactionGroup.tsx
'use client';

import { TransactionSummary, Transaction } from '@/features/transaction/types';
import DailyTransactionItem from './DailyTransactionItem';
import { useRouter } from 'next/navigation';

interface Props {
  group: TransactionSummary;
}

export default function DailyTransactionGroup({ group }: Props) {
  const router = useRouter();

  const date = new Date(group.label);
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

  const incomeColor = 'text-[#3C50E0]'; // TailAdmin 파랑
  const expenseColor = 'text-[#fb5c4c]'; // TailAdmin 소프트레드

  const handleClick = () => {
    router.push('/transaction/new');
  };
  return (
    <div className='mb-4' onClick={handleClick}>
      {/* 날짜 헤더 */}
      <div
        className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-md cursor-pointer transition-colors duration-200 border hover:bg-zinc-50 dark:hover:bg-zinc-900 border-transparent`}
      >
        {/* 날짜 */}
        <div className='col-span-1 text-lg font-bold text-gray-900 dark:text-white'>
          {day}
        </div>

        {/* 요일 뱃지 */}
        <div className='col-span-1'>
          <span className='inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300'>
            {weekday}
          </span>
        </div>

        <div className='col-span-4' />

        {/* 수입/지출 요약 */}
        <div className={`col-span-3 text-sm text-right ${incomeColor}`}>
          +₩{group.incomeTotal.toLocaleString()}
        </div>
        <div className={`col-span-3 text-sm text-right ${expenseColor}`}>
          -₩{group.expenseTotal.toLocaleString()}
        </div>
      </div>

      {/* 거래 리스트 */}
      <ul className='mt-2 space-y-2'>
        {group.transactions.map((tx: Transaction) => (
          <DailyTransactionItem key={tx.id} tx={tx} />
        ))}
      </ul>
    </div>
  );
}
