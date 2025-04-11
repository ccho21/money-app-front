'use client';

import { AccountSummaryDTO } from '@/features/account/types';
import { formatCurrency } from '@/lib/utils';
import { Wallet } from 'lucide-react';
import React from 'react';

interface AccountBoxProps {
  accounts: AccountSummaryDTO[];
}

export default function AccountBox({ accounts }: AccountBoxProps) {
  return (
    <div className='px-4 pt-4'>
      <h2 className='text-sm mb-2 flex items-center gap-1'>
        <Wallet className='w-4 h-4' /> Accounts
      </h2>
      <div className='bg-white dark:bg-gray-800 rounded p-3 text-sm'>
        {accounts.map((acc) => (
          <div key={acc.accountId} className='flex justify-between mb-1'>
            <span>Exp. ({acc.accountName})</span>
            <span>{formatCurrency(acc.expenseTotal)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
