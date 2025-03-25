import { Transaction } from '@/features/transaction/types';

export default function DailyTransactionItem({ tx }: { tx: Transaction }) {
  return (
    <li className="px-3 py-2 border-b">
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-2 text-lg">{tx.category?.icon}</div>
        <div className="col-span-3 text-sm">{tx.note}</div>
        <div className="col-span-1" />
        <span
          className={`col-span-3 text-sm text-right ${
            tx.type === 'income' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          {tx.type === 'income' ? `₩${tx.amount.toFixed(2)}` : ''}
        </span>
        <span
          className={`col-span-3 text-sm text-right ${
            tx.type === 'expense' ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {tx.type === 'expense' ? `₩${tx.amount.toFixed(2)}` : ''}
        </span>
      </div>
    </li>
  );
}
