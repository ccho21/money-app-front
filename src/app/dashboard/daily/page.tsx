'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import SummaryBox from '@/components/ui/SummaryBox';
import TransactionGroup from './_components/TransactionGroup';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { fetchTransactionSummary } from '@/services/transactionService';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { useShallow } from 'zustand/shallow';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';

export default function DailyPage() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ 추가된 부분

  const { isLoading } = useTransactionStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
    }))
  );

  const transactionSummaryResponse = useTransactionStore((state) => {
    return state.transactionSummaryResponse;
  });

  const { setSelectedTransaction } = useTransactionStore(
    (state) => state.actions
  );

  const {
    state: { date, range },
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  useEffect(() => {
    if (range !== 'monthly') {
      useDateFilterStore.getState().actions.setRange('monthly');
    }
  }, [range]);

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };
    const run = async () => {
      await fetchTransactionSummary(params);
    };
    run();
  }, [dateRangeKey, pathname]); // ✅ pathname 포함해서 라우팅 변경 시도 포함

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionSummaryResponse) {
    return <EmptyMessage />;
  }

  return (
    <>
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: transactionSummaryResponse.incomeTotal,
              color:
                transactionSummaryResponse.incomeTotal > 0
                  ? 'text-[#3C50E0]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Exp.',
              value: transactionSummaryResponse.expenseTotal,
              color:
                transactionSummaryResponse.expenseTotal > 0
                  ? 'text-[#fb5c4c]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Total',
              value:
                transactionSummaryResponse.incomeTotal -
                transactionSummaryResponse.expenseTotal,
              color: 'text-gray-900 dark:text-white',
              prefix: '$',
            },
          ]}
        />
      </Panel>

      <Panel>
        {transactionSummaryResponse.data.map((group) => (
          <TransactionGroup
            key={group.label}
            label={group.label}
            rangeStart={group.rangeStart}
            rangeEnd={group.rangeEnd}
            incomeTotal={group.incomeTotal}
            expenseTotal={group.expenseTotal}
            transactions={group.transactions}
            onTransactionClick={(tx) => {
              setSelectedTransaction(tx);
              router.push(`/transaction/${tx.id}/edit`);
            }}
            onHeaderClick={() => {
              router.push(`/transaction/new?date=${group.label}`);
            }}
          />
        ))}
      </Panel>
    </>
  );
}
