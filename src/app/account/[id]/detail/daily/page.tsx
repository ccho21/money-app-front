// ✅ src/app/account/[id]/detail/daily/page.tsx

'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';

import { useAccountStore } from '@/stores/useAccountStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

import { useShallow } from 'zustand/shallow';
import { getDateRangeKey } from '@/lib/date.util';

import Panel from '@/components/ui/Panel';
import SummaryBox from '@/components/ui/SummaryBox';
import EmptyMessage from '@/components/ui/EmptyMessage';
import TransactionGroup from '@/app/dashboard/daily/_components/TransactionGroup';

export default function AccountDetailDailyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { id: accountId } = useParams();

  const { startDate, endDate } = useDateFilterStore((state) => state);

  const { isLoading, transactionSummaryResponse, fetchSummary } =
    useAccountStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        fetchSummary: state.fetchSummary,
      }))
    );

  useEffect(() => {
    if (accountId) {
      fetchSummary({
        accountId: accountId as string,
        startDate,
        endDate,
        groupBy: 'daily',
      });
    }
  }, [accountId, startDate, endDate]);

  const rangeLabel = useMemo(() => {
    return getDateRangeKey({ startDate, endDate, groupBy: 'daily' });
  }, [startDate, endDate]);

  const groups = transactionSummaryResponse?.groups ?? [];

  return (
    <Panel>
      <SummaryBox
        items={[
          {
            label: 'Income',
            value: transactionSummaryResponse?.incomeTotal,
            color:
              transactionSummaryResponse?.incomeTotal > 0
                ? 'text-[#3C50E0]'
                : 'text-gray-400',
            prefix: '$',
          },
          {
            label: 'Exp.',
            value: transactionSummaryResponse?.expenseTotal,
            color:
              transactionSummaryResponse?.expenseTotal > 0
                ? 'text-[#fb5c4c]'
                : 'text-gray-400',
            prefix: '$',
          },
          {
            label: 'Total',
            value:
              (transactionSummaryResponse?.incomeTotal ?? 0) -
              (transactionSummaryResponse?.expenseTotal ?? 0),
            color: 'text-black',
            prefix: '$',
          },
        ]}
      />

      {groups.length > 0 ? (
        groups.map((group) => (
          <TransactionGroup
            key={group.label}
            label={group.label}
            items={group.items}
            type='daily'
            dateRangeLabel={rangeLabel}
            accountId={accountId as string}
          />
        ))
      ) : (
        <EmptyMessage message='No transactions found for this period.' />
      )}
    </Panel>
  );
}
