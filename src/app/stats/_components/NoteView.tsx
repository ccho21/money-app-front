'use client';

import { formatCurrency } from '@/lib/utils';
import React from 'react';

const dummyNotes = [
  { note: '커피', count: 2, amount: 4.48 },
  { note: '뭔데?', count: 2, amount: 5.0 },
  { note: '커피2', count: 1, amount: 3.0 },
  { note: '', count: 1, amount: 20.0 },
];

export default function NoteView() {
  const total = dummyNotes.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-400'>Income</span>
        <span className='text-sm font-semibold text-red-500'>
          Exp. {formatCurrency(total)}
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
          {dummyNotes.map((item, index) => (
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
