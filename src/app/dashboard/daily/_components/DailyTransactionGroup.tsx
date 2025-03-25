import { GroupedTransactionSummary, Transaction } from '@/features/transaction/types';
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
  return (
    <div className="mb-6">
      {/* 날짜 헤더 */}
      <div
        className={`grid grid-cols-12 items-center px-3 py-2 rounded-md cursor-pointer ${
          selected ? 'bg-gray-100 font-semibold' : ''
        }`}
        onClick={onSelect}
      >
        <span className="col-span-2 text-lg">
          {new Date(group.label).getDate()}
        </span>
        <span className="col-span-2 text-sm text-gray-500">
          {new Date(group.label).toLocaleDateString('en-US', {
            weekday: 'short',
          })}
        </span>
        <div className="col-span-2" />
        <p className="col-span-3 text-blue-500 text-sm text-right">
          ₩{group.incomeTotal.toFixed(2)}
        </p>
        <p className="col-span-3 text-red-500 text-sm text-right">
          ₩{group.expenseTotal.toFixed(2)}
        </p>
      </div>

      {/* 거래 리스트 */}
      <ul className="mt-2 space-y-2">
        {group.transactions.map((tx: Transaction) => (
          <DailyTransactionItem key={tx.id} tx={tx} />
        ))}
      </ul>
    </div>
  );
}
