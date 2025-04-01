'use client';

import { useRouter } from 'next/navigation';
import { Transaction } from '@/features/transaction/types';
import { useTransactionStore } from '@/stores/useTransactionStore';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  const router = useRouter();
  const isIncome = tx.type === 'income';

  const {
    actions: { setSelectedTransaction },
  } = useTransactionStore();

  const incomeColor = 'text-[#3C50E0]'; // TailAdmin primary
  const expenseColor = 'text-[#fb5c4c]'; // TailAdmin warning

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 상위 그룹 클릭 이벤트 방지
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <li
      onClick={handleClick}
      className='px-3 py-2.5 dark:border-zinc-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition'
    >
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
            {tx.account?.name}
          </div>
        </div>

        {/* 수입 */}
        <div className='col-span-3 text-sm text-right'>
          {isIncome && (
            <span className={incomeColor}>+₩{tx.amount.toLocaleString()}</span>
          )}
        </div>

        {/* 지출 */}
        <div className='col-span-3 text-sm text-right'>
          {!isIncome && (
            <span className={expenseColor}>-₩{tx.amount.toLocaleString()}</span>
          )}
        </div>
      </div>
    </li>
  );
}
