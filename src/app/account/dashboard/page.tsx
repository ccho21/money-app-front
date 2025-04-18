'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import SummaryBox from '@/components/stats/SummaryBox';
import { fetchAccountDashboard } from '@/features/account/hooks';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';
import { useRouter } from 'next/navigation';
import { AccountDashboardItemDTO } from '@/features/account/types';
import Panel from '@/components/ui/Panel';
import { useUIStore } from '@/stores/useUIStore';

//
// Account dashboard summary page
//
export default function AccountsPage() {
  const router = useRouter();
  const {
    setSelectedAccount,
    state: { accountDashboard, isLoading },
  } = useAccountStore();

  //
  // Set top navigation when mounted
  //
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Accounts.',
      onBack: undefined,
    });

    return () => {
      //
      // Reset top navigation when unmounted
      //
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  //
  // Fetch account dashboard data on mount
  //
  useEffect(() => {
    (async () => {
      await fetchAccountDashboard();
    })();
  }, []);

  if (isLoading || !accountDashboard) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  const { asset, liability, total, data } = accountDashboard;
  const { CASH, BANK, CARD } = data;

  //
  // Navigate to detail page with selected account
  //
  const handleClick = (acc: AccountDashboardItemDTO) => {
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
            const typedItems = items as AccountDashboardItemDTO[];
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
