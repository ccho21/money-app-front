'use client';

import { useEffect, useMemo } from 'react';
import SummaryBox from '@/components/ui/SummaryBox';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { fetchTransactionSummary } from '@/services/transactionService';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { useShallow } from 'zustand/shallow';
import TransactionGroup from './_components/TransactionGroup';
import { useRouter } from 'next/navigation';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { parse, startOfDay } from 'date-fns';

export default function DailyPage() {
  const router = useRouter();
  const { isLoading, transactionSummaryResponse } = useTransactionStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      transactionSummaryResponse: state.transactionSummaryResponse,
    }))
  );

  const { setSelectedTransaction } = useTransactionStore(
    (state) => state.actions
  );

  const { setField } = useTransactionFormStore((state) => state.actions);

  const {
    state: { date, range },
    actions: { setRange },
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  useEffect(() => {
    if (range !== 'monthly')
      useDateFilterStore.getState().actions.setRange('monthly');
  }, [range]);

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };
    const run = async () => {
      console.log('### DAILY fetchTransactionSummary');
      await fetchTransactionSummary(params);
    };
    run();
  }, [dateRangeKey, setRange, range]);

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionSummaryResponse) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <>
      <SummaryBox
        items={[
          {
            label: 'Income',
            value: transactionSummaryResponse.incomeTotal,
            color:
              transactionSummaryResponse.incomeTotal > 0
                ? 'text-[#3C50E0]'
                : 'text-gray-400',
            prefix: '₩',
          },
          {
            label: 'Exp.',
            value: transactionSummaryResponse.expenseTotal,
            color:
              transactionSummaryResponse.expenseTotal > 0
                ? 'text-[#fb5c4c]'
                : 'text-gray-400',
            prefix: '₩',
          },
          {
            label: 'Total',
            value:
              transactionSummaryResponse.incomeTotal -
              transactionSummaryResponse.expenseTotal,
            color: 'text-gray-900 dark:text-white',
            prefix: '₩',
          },
        ]}
      />

      <div className='mt-4 space-y-4'>
        {transactionSummaryResponse.data.map((group) => (
          <TransactionGroup
            key={group.label}
            label={group.label}
            rangeStart={group.rangeStart}
            rangeEnd={group.rangeEnd}
            incomeTotal={group.incomeTotal}
            expenseTotal={group.expenseTotal}
            transactions={group.transactions}
            // showRange={type === 'weekly'}
            onTransactionClick={(tx) => {
              setSelectedTransaction(tx);
              router.push(`/transaction/${tx.id}/edit`);
            }}
            onHeaderClick={() => {
              const parsed = parse(group.label, 'yyyy-MM-dd', new Date());
              useTransactionFormStore.getState().actions.init({
                type: 'expense',
                date: parsed.toISOString(),
              });
              router.push('/transaction/new');
            }}
          />
        ))}
      </div>
    </>
  );
}
