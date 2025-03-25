import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  date: string; // '2025-03-24'
  onClose: () => void;
  isOpen: boolean;
};

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  note?: string;
};

type DetailData = {
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
};

export default function CalendarTransactionDetail({
  date,
  isOpen,
  onClose,
}: Props) {
  const [data, setData] = useState<DetailData | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetch = async () => {
      const res = await api<DetailData>(`/transactions?date=${date}`);
      setData(res);
    };
    fetch();
  }, [date, isOpen]);

  const day = new Date(date).getDate();
  const weekday = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
  });
  const month = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='fixed inset-0 z-50 flex justify-center items-end'
          onClick={onClose}
        >
          <div
            className='bg-white w-full rounded-t-xl max-h-[80vh] overflow-y-auto px-4 pt-4 pb-20'
            onClick={(e) => e.stopPropagation()}
          >
            {/* 날짜 헤더 */}
            <div className='flex justify-between items-center border-b pb-2 mb-2'>
              <div className='flex items-center gap-2 text-lg font-semibold'>
                <span>{day}</span>
                <span className='text-sm text-gray-500'>
                  {month} | {weekday}
                </span>
              </div>
              {data && (
                <div className='text-right text-sm'>
                  <p className='text-blue-500'>
                    Income: ${data.incomeTotal.toFixed(2)}
                  </p>
                  <p className='text-red-500'>
                    Expense: ${data.expenseTotal.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* 거래 리스트 */}
            {data ? (
              <ul className='space-y-3'>
                {data.transactions.map((tx) => (
                  <li
                    key={tx.id}
                    className='flex justify-between items-center border-b pb-2'
                  >
                    <div>
                      <p className='text-sm'>
                        {tx.category.icon} {tx.category.name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {tx.note && `메모: ${tx.note}`}
                      </p>
                    </div>
                    <span
                      className={`text-sm ${
                        tx.type === 'income' ? 'text-blue-500' : 'text-red-500'
                      }`}
                    >
                      ${tx.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='p-4'>불러오는 중...</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
