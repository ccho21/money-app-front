import {
  GroupedTransactionSummary,
  Transaction,
} from '@/features/transaction/types';
import DailyTransactionItem from './DailyTransactionItem';

interface Props {
  group: GroupedTransactionSummary;
  selected: boolean;
  onSelect: () => void;
}

export default function DailyTransactionGroup({
  group,
  selected,
  onSelect,
}: Props) {
  const date = new Date(group.label);
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className='mb-6'>
      {/* 날짜 헤더 */}
      <div
        className={`grid grid-cols-12 items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
          selected
            ? 'bg-zinc-100 dark:bg-zinc-800'
            : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'
        }`}
        onClick={onSelect}
      >
        <div className='col-span-1 text-xl font-bold text-gray-800 dark:text-white'>
          {day}
        </div>
        <div className='col-span-1 text-sm text-gray-500'>{weekday}</div>
        <div className='col-span-4'></div>
        <div className='col-span-3 text-sm text-right font-medium text-emerald-500 dark:text-emerald-400'>
          ₩{group.incomeTotal.toFixed(2)}
        </div>
        <div className='col-span-3 text-sm text-right font-medium text-rose-500 dark:text-rose-400'>
          ₩{group.expenseTotal.toFixed(2)}
        </div>
        <div className='col-span-3'></div>
      </div>

      {/* 거래 리스트 */}
      <ul className='mt-3 space-y-2'>
        {group.transactions.map((tx: Transaction) => (
          <DailyTransactionItem key={tx.id} tx={tx} />
        ))}
      </ul>
    </div>
  );
}
