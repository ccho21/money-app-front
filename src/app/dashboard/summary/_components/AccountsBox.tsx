// ✅ 파일 경로: src/app/dashboard/summary/_components/AccountsBox.tsx

import { AccountSummary } from '@/features/accounts/types';
import React from 'react';

interface AccountsBoxProps {
  accounts: AccountSummary[];
}

export default function AccountsBox({ accounts }: AccountsBoxProps) {
  return (
    <div className='rounded-xl border px-4 py-3 bg-white dark:bg-zinc-900'>
      <h2 className='text-md font-semibold mb-3'>Accounts</h2>
      <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
        {accounts.map((acc) => (
          <div key={acc.accountId} className='flex justify-between'>
            <span>Exp. ({acc.name})</span>
            <span className='font-medium'>{acc.balance.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
