'use client';

import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';
import { AccountTransactionItemDTO } from '@/modules/account/types';

import { Wallet } from 'lucide-react';
import React from 'react';

interface AccountBoxProps {
  accounts: AccountTransactionItemDTO[];
}

export default function AccountBox({ accounts }: AccountBoxProps) {
  return (
    <div className='px-4 pt-4'>
      <h2 className='text-sm mb-2 flex items-center gap-1 text-muted'>
        <Wallet className='w-4 h-4 text-muted' /> Accounts
      </h2>

      <div className='bg-surface rounded p-3 text-sm'>
        {accounts.map((acc) => (
          <div
            key={acc.accountId}
            className='flex justify-between mb-1 text-foreground'
          >
            <span className='text-muted'>Exp. ({acc.accountName})</span>
            <CurrencyDisplay amount={acc.totalExpense ?? 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
