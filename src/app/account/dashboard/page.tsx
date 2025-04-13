'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import SummaryBox from '@/components/stats/SummaryBox';
import { fetchAccountDashboard } from '@/features/account/hooks';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';
import { useRouter } from 'next/navigation';
import { AccountDashboardItem } from '@/features/account/types';
import Panel from '@/components/ui/Panel';
import { useUIStore } from '@/stores/useUIStore';

export default function AccountsPage() {
  const router = useRouter();
  const {
    actions: { setSelectedAccount },
    state: { accountDashboard, isLoading },
  } = useAccountStore();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Accounts.',
      onBack: undefined,
    });
    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  useEffect(() => {
    (async () => {
      await fetchAccountDashboard(); // ✅ 새 API 연동
    })();
  }, []);

  if (isLoading || !accountDashboard) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
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
    router.push(`/account/${acc.id}/detail/daily`);
  };

  return (
    <div className='space-y-4 bg-surface min-h-screen text-foreground'>
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Assets',
              value: asset,
              color: 'text-info',
              prefix: '$',
            },
            {
              label: 'Liabilities',
              value: liability,
              color: 'text-error',
              prefix: '$',
            },
            {
              label: 'Total',
              value: total,
              color: 'text-success',
              prefix: '$',
            },
          ]}
        />
      </Panel>

      <Panel>
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
                <h3 className='text-xs font-semibold text-muted px-3 mb-2 tracking-wide uppercase'>
                  {label === 'CASH' && 'Cash'}
                  {label === 'BANK' && 'Bank Accounts'}
                  {label === 'CARD' && 'Card'}
                </h3>
                <div className='divide-y divide-border'>
                  {typedItems.map((acc) => (
                    <CategoryListItem
                      key={acc.id}
                      name={acc.name}
                      amount={acc.amount}
                      outstandingBalance={acc.outstandingBalance}
                      balancePayable={acc.balancePayable}
                      onClick={() => handleClick(acc)}
                      showProgress={false}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
