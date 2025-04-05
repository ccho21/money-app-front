'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/app/account-dashboard/_components/useAccountStore';
import SummaryBox from '@/components/ui/SummaryBox';
import { fetchAccountDashboard } from './_components/accountService';
import { CategoryListItem } from '../stats/_components/CategoryListItem';
import { AccountDashboardItem } from './_components/account/types';
import { useRouter } from 'next/navigation';

export default function AccountsPage() {
  const router = useRouter();
  const {
    actions: { setSelectedAccount },
    state: { accountDashboard, isLoading },
  } = useAccountStore();

  useEffect(() => {
    fetchAccountDashboard(); // ✅ 새 API 연동
  }, []);

  if (isLoading || !accountDashboard) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  const { asset, liability, total, data } = accountDashboard;
  const { CASH, BANK, CARD } = data;

  const handleClick = (acc: AccountDashboardItem) => {
    setSelectedAccount({
      id: acc.id,
      type: acc.type,
      name: acc.name,
      balance: acc.amount,
      settlementDate: acc.settlementDate,
      paymentDate: acc.paymentDate,
    });
    router.push(`/account/${acc.id}/edit`);
  };
  return (
    <div className='p-4 space-y-6 bg-white'>
      <SummaryBox
        items={[
          {
            label: 'Assets',
            value: asset,
            color: 'text-blue-600',
            prefix: '₩',
          },
          {
            label: 'Liabilities',
            value: liability,
            color: 'text-red-500',
            prefix: '₩',
          },
          {
            label: 'Total',
            value: total,
            color: 'text-black dark:text-white',
            prefix: '₩',
          },
        ]}
      />

      <div className='space-y-6'>
        {[
          ['CASH', CASH],
          ['BANK', BANK],
          ['CARD', CARD],
        ].map(([label, items]) => {
          const typedItems = items as typeof CASH;
          if (typedItems.length === 0) return null;

          return (
            <div key={label as string}>
              <h3 className='text-sm font-semibold text-gray-500 mb-2'>
                {label === 'CASH' && 'Cash'}
                {label === 'BANK' && 'Bank Accounts'}
                {label === 'CARD' && 'Card'}
              </h3>
              <div className='divide-y'>
                {typedItems.map((acc) => (
                  <CategoryListItem
                    key={acc.id}
                    name={acc.name}
                    amount={acc.amount}
                    outstandingBalance={acc.outstandingBalance}
                    balancePayable={acc.balancePayable}
                    onClick={() => handleClick(acc)}
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
