'use client';

import { useEffect, useMemo } from 'react';
import DailyTransactionGroup from './_components/DailyTransactionGroup';
import SummaryBox from '@/components/ui/SummaryBox';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { fetchTransactionSummary } from '@/services/transactionService';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { useShallow } from 'zustand/shallow';

export default function DailyPage() {
  const { isLoading, transactionSummaryResponse } = useTransactionStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      transactionSummaryResponse: state.transactionSummaryResponse,
    }))
  );

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
  }, []);

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: range,
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
          <DailyTransactionGroup key={group.label} group={group} />
        ))}
      </div>
    </>
  );
}
