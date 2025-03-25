'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Transaction } from '@/types/transaction';

type DailyGrouped = {
  date: string;
  transactions: Transaction[];
  incomeTotal: number;
  expenseTotal: number;
};

export default function DailyPage() {
  const [groupedData, setGroupedData] = useState<DailyGrouped[]>([]);
  const [selectedDate, setSelectedDate] = useState('2025-03-24');

  useEffect(() => {
    // 전체 주간 또는 월간 범위 호출 후 날짜별로 groupBy
    const fetch = async () => {
      const res = await api<Transaction[]>(
        '/transactions?range=month&date=2025-03-01'
      );

      const grouped = groupByDate(res);
      setGroupedData(grouped);
    };
    fetch();
  }, []);

  const groupByDate = (txs: Transaction[]): DailyGrouped[] => {
    const map = new Map<string, Transaction[]>();

    txs.forEach((tx) => {
      const date = tx.date;
      if (!map.has(date)) map.set(date, []);
      map.get(date)?.push(tx);
    });

    return Array.from(map.entries()).map(([date, txs]) => ({
      date,
      transactions: txs,
      incomeTotal: txs
        .filter((t) => t.type === 'income')
        .reduce((a, b) => a + b.amount, 0),
      expenseTotal: txs
        .filter((t) => t.type === 'expense')
        .reduce((a, b) => a + b.amount, 0),
    }));
  };

  return (
    <div className='p-4 pb-24'>
      {groupedData.map((group) => (
        <div key={group.date} className='mb-6'>
          {/* 날짜 헤더 */}
          <div
            className={`grid grid-cols-12 items-center px-3 py-2 rounded-md ${
              selectedDate === group.date ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => setSelectedDate(group.date)}
          >
            <span className='col-span-2 text-lg'>
              {new Date(group.date).getDate()}
            </span>
            <span className='col-span-2 text-sm text-gray-500'>
              {new Date(group.date).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </span>
            <div className='col-span-2' />
            <p className='col-span-3 text-blue-500 text-sm text-right'>
              ₩{group.incomeTotal.toFixed(2)}
            </p>
            <p className='col-span-3 text-red-500 text-sm text-right'>
              ₩{group.expenseTotal.toFixed(2)}
            </p>
          </div>

          {/* 거래 리스트 */}
          <ul className='mt-2 space-y-2'>
            {group.transactions.map((tx) => (
              <li key={tx.id} className='px-3 py-2 border-b'>
                <div className='grid grid-cols-12 items-center'>
                  <div className='col-span-2 text-lg'>{tx.category?.icon}</div>
                  <div className='col-span-3 text-sm'>{tx.note}</div>
                  <div className='col-span-1' />
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
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
