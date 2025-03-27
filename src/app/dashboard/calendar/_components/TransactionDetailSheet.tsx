// 파일 경로: src/components/ui/TransactionDetailSheet.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface Transaction {
  id: number;
  category: string;
  memo: string;
  method: string;
  amount: number;
}

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
  onPrev,
  onNext,
}: Props) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === 'sheet-backdrop') onClose();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id='sheet-backdrop'
          className='fixed inset-0 z-40 bg-black/40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 rounded-t-2xl z-50 max-h-[85%] flex flex-col shadow-xl'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Top Summary */}
            <div className='grid grid-cols-12 items-start gap-2 px-5 pt-5'>
              {/* 날짜: col-span-4 */}
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
              {/* 수입: col-span-4 */}
              <div className='col-span-5 text-right text-sm text-[#3C50E0] mt-1'>
                +₩{income.toLocaleString()}
              </div>
              {/* 지출: col-span-4 */}
              <div className='col-span-3 text-right text-sm text-[#F04438] mt-1'>
                -₩{Math.abs(expense).toLocaleString()}
              </div>
            </div>

            {/* Transaction List */}
            <div className='overflow-y-auto mt-5 px-5 space-y-3 pb-32'>
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className='grid grid-cols-12 items-center border-b border-gray-200 dark:border-zinc-700 py-2 px-1'
                >
                  {/* 카테고리 */}
                  <div className='col-span-2 text-[15px] text-gray-700 dark:text-gray-200'>
                    {t.category}
                  </div>

                  {/* 메모 + 방법 */}
                  <div className='col-span-6 overflow-hidden'>
                    <div className='text-xs text-muted-foreground truncate'>
                      {t.memo}
                    </div>
                    <div className='text-xs text-gray-500 truncate'>
                      {t.method}
                    </div>
                  </div>

                  {/* 금액 */}
                  <div
                    className={`col-span-4 text-right text-sm ${
                      t.amount < 0 ? 'text-[#F04438]' : 'text-[#3C50E0]'
                    }`}
                  >
                    {t.amount < 0 ? '-' : '+'}₩
                    {Math.abs(t.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Buttons */}
            {/* <div className='fixed bottom-20 right-4 flex gap-2 z-50'>
              <button className='w-12 h-12 bg-white border border-gray-300 dark:border-zinc-600 rounded-full text-gray-700 dark:text-gray-100 text-xl flex items-center justify-center shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition'>
                📝
              </button>
              <button className='w-12 h-12 bg-[#F04438] text-white rounded-full text-xl flex items-center justify-center shadow-md hover:bg-[#d33c2e] transition'>
                ＋
              </button>
            </div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
