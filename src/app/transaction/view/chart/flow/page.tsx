'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { InsightCard } from '@/modules/transaction/components/chart/InsightCard';
import { MonthlySummaryGrid } from '@/modules/transaction/components/chart/MonthlySummaryGrid';
import TransactionYearChart from '@/modules/transaction/components/chart/TransactionYearChart';
import { fetchTransactionChartFlow } from '@/modules/transaction/hooks/fetches';
import { useTransactionStore } from '@/modules/transaction/stores/store';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { useFilterStore } from '@/stores/useFilterStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export default function TransactionChartFlowPage() {
  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  const { chartFlow, isLoading } = useTransactionStore(
    useShallow((s) => ({
      chartFlow: s.chartFlow,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    }
  }, [groupBy, setQuery]);

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');

    const params: TransactionGroupQuery = {
      timeframe: 'yearly',
      startDate,
      endDate,
    };

    (async () => {
      Promise.all([fetchTransactionChartFlow(params)]);
    })();
  }, [getDateRangeKey, date, isInitialized]);

  if (isLoading) return <Skeleton className='h-40 w-full' />;
  if (!chartFlow) return null;
  return (
    <>
      <main className='w-full pb-[10vh] space-y-component'>
        {/* 📊 Chart */}
        <TransactionYearChart periods={chartFlow.periods} />

        {/* 💡 Insight */}
        {/* <InsightCard text={chartFlow.insight} /> */}

        {/* 📦 Monthly Summary */}
        <MonthlySummaryGrid periods={chartFlow.periods} />
      </main>
    </>
  );
}
