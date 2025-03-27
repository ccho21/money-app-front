import { Transaction } from '@/features/transaction/types';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  return (
    <li className='px-4 py-2 border-b border-gray-200 dark:border-zinc-700'>
      <div className='grid grid-cols-12 items-center'>
        <div className='col-span-2 text-xl'>{tx.category?.icon}</div>
        <div className='col-span-4 text-sm text-gray-700 dark:text-gray-300 truncate'>
          {tx.note}
        </div>

        {tx.type === 'income' ? (
          <>
            <div className='col-span-3 text-sm text-right font-medium text-emerald-500 dark:text-emerald-400'>
              ₩{tx.amount.toFixed(2)}
            </div>
            <div className='col-span-3'></div>
          </>
        ) : (
          <>
            <div className='col-span-3'></div>
            <div className='col-span-3 text-sm text-right font-medium text-rose-500 dark:text-rose-400'>
              ₩{tx.amount.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </li>
  );
}
