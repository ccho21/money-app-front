'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import SummaryBox from '@/components/ui/SummaryBox';
import { CategoryListItem } from '../stats/_components/CategoryListItem';
import { fetchTransactionSummary } from '@/services/transactionService';
import { format } from 'date-fns';

export default function AccountsPage() {
  const {
    state: { summaries, isLoading },
  } = useAccountStore();

  useEffect(() => {
    const date = new Date();
    fetchTransactionSummary({
      groupBy: 'monthly',
      startDate: format(date, 'yyyy-MM'),
      endDate: format(date, 'yyyy-MM'),
    });
  }, []);

  const assetAccounts = summaries.filter(
    (a) => a.balance >= 0 && a.accountName.toUpperCase() !== 'CARD'
  );
  const liabilityAccounts = summaries.filter(
    (a) => a.balance < 0 || a.accountName.toUpperCase() === 'CARD'
  );

  const assetTotal = assetAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const liabilityTotal = liabilityAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );
  const netTotal = assetTotal + liabilityTotal;

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  return (
    <div className='p-4 space-y-6'>
      <SummaryBox
        items={[
          {
            label: 'Assets',
            value: assetTotal,
            color: 'text-blue-600',
            prefix: '₩',
          },
          {
            label: 'Liabilities',
            value: liabilityTotal,
            color: 'text-red-500',
            prefix: '₩',
          },
          {
            label: 'Total',
            value: netTotal,
            color: 'text-black dark:text-white',
            prefix: '₩',
          },
        ]}
      />

      <div className='space-y-6'>
        {['CASH', 'BANK', 'CARD'].map((type) => {
          const filtered = summaries.filter((a) =>
            a.accountName.toUpperCase().includes(type)
          );

          if (filtered.length === 0) return null;

          return (
            <div key={type}>
              <h3 className='text-sm font-semibold text-gray-500 mb-2'>
                {type === 'CASH' && 'Cash'}
                {type === 'BANK' && 'Bank Accounts'}
                {type === 'CARD' && 'Card'}
              </h3>
              <div className='divide-y'>
                {filtered.map((acc) => (
                  <CategoryListItem
                    key={acc.accountId}
                    name={acc.accountName}
                    amount={acc.balance}
                    isMatched={true} // ✅ 향후 잔고 정합성 비교 로직 연결 예정
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
