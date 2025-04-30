'use client';

import { useEffect, useCallback } from 'react';
import { useAccountStore } from '@/modules/account/store';
import SummaryBox from '@/components/stats/SummaryBox';
import { CategoryListItem } from '@/components/category/CategoryListItem';
import { useRouter } from 'next/navigation';
import { AccountDashboardItemDTO } from '@/modules/account/types';
import Panel from '@/components/ui/panel/Panel';
import { useUIStore } from '@/stores/useUIStore';
import { fetchAccountDashboard } from '@/modules/account/hooks';

export default function AccountDashboardPage() {
  const router = useRouter();
  const { setSelectedAccount, accountDashboard, isLoading } = useAccountStore();

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
      await fetchAccountDashboard();
    })();
  }, []);

  const summaryItems = accountDashboard
    ? [
        {
          label: 'Assets',
          value: accountDashboard.asset,
          color: 'text-info',
          prefix: '$',
        },
        {
          label: 'Liabilities',
          value: accountDashboard.liability,
          color: 'text-error',
          prefix: '$',
        },
        {
          label: 'Total',
          value: accountDashboard.total,
          color: 'text-success',
          prefix: '$',
        },
      ]
    : [];

  const handleClick = useCallback(
    (acc: AccountDashboardItemDTO) => {
      setSelectedAccount({
        id: acc.id,
        type: acc.type,
        name: acc.name,
        balance: acc.amount,
        description: '',
        color: '',
        settlementDate: acc.settlementDate ?? undefined,
        paymentDate: acc.paymentDate ?? undefined,
        autoPayment: acc.autoPayment ?? false,
      });
      router.push(`/account/${acc.id}/detail/daily`);
    },
    [router, setSelectedAccount]
  );

  if (isLoading || !accountDashboard) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  const { CASH, BANK, CARD } = accountDashboard.data;

  return (
    <div className='space-y-4 bg-surface min-h-screen text-foreground'>
      <Panel>
        <SummaryBox items={summaryItems} />
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
