'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/modules/account/store';
import { fetchAccountDashboard } from '@/modules/account/hooks';
import { AccountDashboardItemDTO } from '@/modules/account/types';

import SummaryBox from '@/components/common/SummaryBox';
import { CategoryListItem } from '@/components_backup/category/CategoryListItem';
import LoadingMessage from '@/components/ui/custom/loadingMessage';

import { useUIStore } from '@/stores/useUIStore';

export default function AccountDashboardPage() {
  const router = useRouter();
  const { setSelectedAccount, accountDashboard, isLoading } = useAccountStore();

  useEffect(() => {
    useUIStore.getState().setTopNav({ title: 'Accounts.', onBack: undefined });
    return () => useUIStore.getState().resetTopNav();
  }, [router]);

  useEffect(() => {
    fetchAccountDashboard();
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
    return <LoadingMessage />;
  }

  const { CASH, BANK, CARD } = accountDashboard.data;

  return (
    <div className='bg-surface text-foreground px-component py-component space-y-component'>
      {/* ✅ 상단 요약 */}
      <SummaryBox items={summaryItems} />

      {/* ✅ 계정 유형별 구분 */}
      <div className='space-y-component'>
        {[
          ['CASH', CASH],
          ['BANK', BANK],
          ['CARD', CARD],
        ].map(([label, items]) => {
          const typedItems = items as AccountDashboardItemDTO[];
          if (!typedItems.length) return null;

          const title =
            label === 'CASH'
              ? 'Cash'
              : label === 'BANK'
              ? 'Bank Accounts'
              : 'Card';

          return (
            <div key={label as string}>
              <h3 className='text-label font-semibold text-muted-foreground tracking-wider uppercase px-element mb-tight'>
                {title}
              </h3>

              <div className='divide-y divide-border rounded-md overflow-hidden bg-card'>
                {typedItems.map((acc) => (
                  <CategoryListItem
                    key={acc.id}
                    name={acc.name}
                    amount={acc.amount}
                    outstandingBalance={acc.outstandingBalance}
                    balancePayable={acc.balancePayable}
                    onClick={() => handleClick(acc)}
                    showProgress={false}
                    className='hover:bg-muted/5 transition'
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
