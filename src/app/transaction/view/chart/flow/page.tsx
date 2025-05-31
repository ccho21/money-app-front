'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { InsightList } from '@/modules/transaction/components/chart/InsightList';
import { MonthlySummaryGrid } from '@/modules/transaction/components/chart/MonthlySummaryGrid';

import { useTransactionChartFlowQuery } from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const TransactionYearChart = dynamic(
  () => import('@/modules/transaction/components/chart/TransactionYearChart'),
  { ssr: false }
);

export default function TransactionChartFlowPage() {
  const { query, setQuery, getDateRangeKey } = useTransactionFilterStore();

  useEffect(() => {
    setQuery((prev) =>
      prev.timeframe !== 'yearly' ? { timeframe: 'yearly' } : {}
    );

    return () => {
      setQuery((prev) =>
        prev.timeframe !== 'monthly' ? { timeframe: 'monthly' } : {}
      );
    };
  }, [setQuery]);

  const [startDate, endDate] = getDateRangeKey().split('_');
  const queryParams: TransactionGroupQuery = {
    timeframe: query.timeframe,
    startDate,
    endDate,
  };

  const {
    data: chartFlow,
    isLoading,
    isError,
  } = useTransactionChartFlowQuery(queryParams);

  if (isLoading) return <Skeleton className='h-40 w-full' />;
  if (isError)
    return (
      <div className='text-sm text-destructive'>Failed to load chart data.</div>
    );
  if (!chartFlow) return null;

  return (
    <main className='layout-shell space-y-component'>
      {/* 📊 Chart Section */}
      <section>
        <TransactionYearChart periods={chartFlow.periods} />
      </section>

      {/* 💡 Insights Section */}
      <section>
        <InsightList insights={chartFlow.insights} />
      </section>

      {/* 📦 Summary Section */}
      <section className=''>
        <h2 className='text-heading font-semibold mb-element'>
          Monthly Summary
        </h2>
        <MonthlySummaryGrid periods={chartFlow.periods} />
      </section>
    </main>
  );
}
