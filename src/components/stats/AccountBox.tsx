// 📄 src/components/stats/AccountBox.tsx

import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';
import { AccountTransactionItemDTO } from '@/modules/account/types';
import { Wallet } from 'lucide-react';
import React from 'react';

interface AccountBoxProps {
  accounts: AccountTransactionItemDTO[];
}

export default function AccountBox({ accounts }: AccountBoxProps) {
  return (
    <div className='px-component pt-component'>
      <h2 className='text-label mb-compact flex items-center gap-tight text-muted'>
        <Wallet className='w-4 h-4 text-muted' /> Accounts
      </h2>

      <div className='bg-surface rounded-default p-element text-label'>
        {accounts.map((acc) => (
          <div
            key={acc.accountId}
            className='flex justify-between mb-tight'
          >
            <span className='text-muted'>Exp. ({acc.accountName})</span>
            <CurrencyDisplay amount={acc.totalExpense ?? 0} type='total' />
          </div>
        ))}
      </div>
    </div>
  );
}
