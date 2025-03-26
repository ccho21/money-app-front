'use client';

import React from 'react';
import { formatCurrency } from '@/features/shared/utils';

const mockAccounts = [
  { id: '1', name: 'Cash', type: 'CASH', balance: 92 },
  { id: '2', name: 'Cash 2', type: 'CASH', balance: 8 },
  { id: '3', name: 'Cash 3', type: 'CASH', balance: 100 },
  { id: '4', name: 'Bank', type: 'BANK', balance: 4000 },
  { id: '5', name: 'Card', type: 'CARD', balance: -24.48 },
  { id: '6', name: 'Card 2', type: 'CARD', balance: -24.48 },
];

export default function AccountsPage() {
  const accounts = mockAccounts;

  const assetTotal = accounts
    .filter((a) => a.type !== 'CARD')
    .reduce((sum, a) => sum + a.balance, 0);

  const liabilityTotal = accounts
    .filter((a) => a.type === 'CARD')
    .reduce((sum, a) => sum + a.balance, 0);

  const netTotal = assetTotal + liabilityTotal;

  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-around text-sm font-medium'>
        <div className='text-center'>
          <p className='text-gray-500'>Assets</p>
          <p className='text-blue-600'>{formatCurrency(assetTotal)}</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-500'>Liabilities</p>
          <p className='text-red-500'>{formatCurrency(liabilityTotal)}</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-500'>Total</p>
          <p className='text-black dark:text-white'>
            {formatCurrency(netTotal)}
          </p>
        </div>
      </div>

      <div className='space-y-6'>
        {['CASH', 'BANK', 'CARD'].map((type) => {
          const filtered = accounts.filter((a) => a.type === type);
          if (filtered.length === 0) return null;

          return (
            <div key={type}>
              <h3 className='text-sm font-semibold text-gray-500 mb-2'>
                {type === 'CASH' && 'Cash'}
                {type === 'BANK' && 'Bank Accounts'}
                {type === 'CARD' && 'Card'}
              </h3>
              <div className='space-y-2'>
                {filtered.map((acc) => (
                  <div
                    key={acc.id}
                    className='flex justify-between items-center px-2 py-2 rounded-md bg-white dark:bg-zinc-900 shadow-sm'
                  >
                    <p className='text-sm font-medium text-gray-800 dark:text-white'>
                      {acc.name}
                    </p>
                    <p
                      className={
                        type === 'CARD'
                          ? 'text-red-500 font-medium'
                          : 'text-blue-600 font-medium'
                      }
                    >
                      {formatCurrency(acc.balance)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
