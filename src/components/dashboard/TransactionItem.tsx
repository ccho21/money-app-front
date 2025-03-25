import { Transaction } from '@/types/transaction';

type Props = {
  date: string; // '2025-03-24'
  transactions: Transaction[];
};

export default function TransactionItem({ date, transactions }: Props) {
  const day = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
  });

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className='mb-4'>
      {/* 날짜 헤더 */}

      {/* 거래 리스트 */}
      <ul className='space-y-2'>
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className='flex justify-between items-center border-b pb-2 px-1'
          >
            <div className='flex items-center justify-between mb-2 px-1'>
              <div className='flex items-center gap-2'>
                <div className='text-lg font-bold'>{date.split('-')[2]}</div>
                <div className='text-gray-500 text-sm'>{day}</div>
              </div>
            </div>
            <div className='text-sm text-gray-800'>
              <span className='block font-medium'>{tx.category?.icon}</span>
              <span className='text-xs text-gray-500'>{tx.note}</span>
            </div>
            <div
              className={`text-sm ${
                tx.type === 'income' ? 'text-blue-500' : 'text-red-500'
              }`}
            >
              ₩{tx.amount.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
