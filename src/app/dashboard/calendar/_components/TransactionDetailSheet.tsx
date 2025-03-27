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

  // 바깥 클릭 감지
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === 'sheet-backdrop') onClose();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id='sheet-backdrop'
          className='fixed inset-0 z-40 bg-black/30 bg-opacity-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='absolute bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 max-h-[80%] flex flex-col shadow-lg'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Top Date Summary */}
            <div className='flex items-center justify-between px-4 pt-4'>
              <div className='flex items-center gap-2'>
                <div className='text-2xl font-bold'>{date.getDate()}</div>
                <div className='flex flex-col text-xs text-gray-400'>
                  <span>{date.toISOString().slice(0, 7)}</span>
                  <span className='bg-gray-200 px-1 rounded-md'>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              </div>
              <div className='text-right text-sm'>
                <div className='text-blue-600 font-semibold'>
                  ${income.toFixed(2)}
                </div>
                <div className='text-red-500 font-semibold'>
                  ${Math.abs(expense).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className='overflow-y-auto mt-4 px-4 space-y-2 pb-20'>
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className='flex justify-between items-center py-2 border-b'
                >
                  <div>
                    <div className='text-sm font-medium text-gray-700'>
                      {t.category}
                    </div>
                    <div className='text-xs text-gray-500'>{t.memo}</div>
                    <div className='text-xs text-gray-400'>{t.method}</div>
                  </div>
                  <div className='text-sm font-semibold text-red-500'>
                    ${Math.abs(t.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Buttons */}
            <div className='absolute bottom-16 right-4 flex gap-2'>
              <button className='w-12 h-12 bg-white border border-red-400 rounded-full text-red-500 text-xl flex items-center justify-center shadow'>
                📝
              </button>
              <button className='w-12 h-12 bg-red-500 text-white rounded-full text-xl flex items-center justify-center shadow'>
                ＋
              </button>
            </div>

            {/* Bottom Navigation */}
            <div className='flex justify-between items-center px-4 py-3 border-t text-sm'>
              <button onClick={onPrev}>&lt;</button>
              <button onClick={onNext}>&gt;</button>
              <button onClick={onClose}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
