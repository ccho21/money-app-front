'use client';

import BottomSheet from '@/components/ui/BottomSheet';
import { Transaction } from '@/features/transaction/types';

interface Props {
  open: boolean;
  date: Date;
  transactions: Transaction[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TransactionDetailSheet({
  open,
  date,
  transactions,
  onClose,
}: Props) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`;

  return (
    <BottomSheet open={open} onClose={onClose}>
      {/* Top Summary */}
      <div className='grid grid-cols-12 items-start gap-2 px-5 pt-5'>
        {/* 날짜 */}
        <div className='col-span-4'>
          <div className='flex items-center gap-3'>
            <div className='text-3xl font-bold text-gray-900 dark:text-white'>
              {date.getDate()}
            </div>
            <div className='flex flex-col text-xs text-muted-foreground'>
              <span>{dateStr}</span>
              <span className='bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full'>
                {weekday}
              </span>
            </div>
          </div>
        </div>

        {/* 수입 */}
        <div className='col-span-5 text-right text-sm text-[#3C50E0] mt-1'>
          +₩{income.toLocaleString()}
        </div>

        {/* 지출 */}
        <div className='col-span-3 text-right text-sm text-[#fb5c4c] mt-1'>
          -₩{Math.abs(expense).toLocaleString()}
        </div>
      </div>

      {/* 거래 리스트 */}
      <div className='overflow-y-auto mt-5 px-5 space-y-3 pb-32'>
        {transactions.map((t) => (
          <div
            key={t.id}
            className='grid grid-cols-12 items-center border-b border-gray-200 dark:border-zinc-700 py-2 px-1'
          >
            <div className='col-span-2 text-[15px] text-gray-700 dark:text-gray-200'>
              {t.category.name}
            </div>

            <div className='col-span-6 overflow-hidden'>
              <div className='text-xs text-muted-foreground truncate'>
                {t.note}
              </div>
              <div className='text-xs text-gray-500 truncate'>•</div>
            </div>

            <div
              className={`col-span-4 text-right text-sm ${
                t.amount < 0 ? 'text-[#fb5c4c]' : 'text-[#3C50E0]'
              }`}
            >
              {t.amount < 0 ? '-' : '+'}₩{Math.abs(t.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
