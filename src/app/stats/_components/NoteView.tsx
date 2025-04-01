'use client';

import { useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import React from 'react';

const mockNoteData = {
  expense: [
    { note: '커피', count: 2, amount: 4.48 },
    { note: '배달', count: 1, amount: 13.5 },
    { note: '', count: 1, amount: 20.0 },
  ],
  income: [
    { note: '급여', count: 1, amount: 3000000 },
    { note: '보너스', count: 1, amount: 500000 },
  ],
};

export default function NoteView() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') || 'expense') as 'expense' | 'income';

  const noteList = mockNoteData[tab];
  const total = noteList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className='bg-white dark:bg-zinc-900 p-4 space-y-4 rounded-xl'>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-400'>
          {tab === 'expense' ? 'Expense Notes' : 'Income Notes'}
        </span>
        <span
          className={`text-sm font-semibold ${
            tab === 'expense' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {tab === 'expense' ? 'Exp.' : 'Inc.'} {formatCurrency(total)}
        </span>
      </div>

      <table className='w-full text-sm text-left'>
        <thead className='text-gray-400 border-b border-gray-200 dark:border-zinc-700'>
          <tr>
            <th className='py-2'>Note</th>
            <th className='py-2 text-center'>Count</th>
            <th className='py-2 text-right'>Amount</th>
          </tr>
        </thead>
        <tbody className='text-gray-800 dark:text-gray-100'>
          {noteList.map((item, index) => (
            <tr
              key={index}
              className='border-b border-gray-100 dark:border-zinc-800'
            >
              <td className='py-2'>{item.note || '-'}</td>
              <td className='py-2 text-center'>{item.count}</td>
              <td className='py-2 text-right'>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
