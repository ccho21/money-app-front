'use client';

import { Card } from '@/components/ui/Card';
import { AccountTransactionSummaryDto } from '@/features/account/types';
import React from 'react';

interface AccountsBoxProps {
  accounts: AccountTransactionSummaryDto[];
}

export default function AccountsBox({ accounts }: AccountsBoxProps) {
  return (
    <Card title='Accounts'>
      <div className='space-y-2 text-sm text-muted'>
        {accounts.map((acc) => (
          <div key={acc.accountId} className='flex justify-between'>
            <span>Exp. ({acc.accountName})</span>
            <span className='font-medium text-foreground'>
              {(acc.incomeTotal - acc.expenseTotal).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
