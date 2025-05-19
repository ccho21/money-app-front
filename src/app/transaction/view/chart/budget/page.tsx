// src/app/transaction/chart/budget/page.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BudgetSummaryDonut } from '@/modules/transaction/components/chart/BudgetSummaryDonut';
import { BudgetUsageStackedBarChart } from '@/modules/transaction/components/chart/BudgetUsageStackedBarChart';
import { InsightCard } from '@/modules/transaction/components/chart/InsightCard';
import { useTransactionChartBudget } from '@/modules/transaction/hooks/queries';
import { useFilterStore } from '@/stores/useFilterStore';

export default function TransactionChartBudgetPage() {
  const { query, getDateRangeKey } = useFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const { groupBy, date } = query;

  const { data, isLoading, error } = useTransactionChartBudget({
    timeframe: groupBy,
    startDate,
    endDate,
  });

  if (isLoading) return <Skeleton />;
  if (data === undefined) return null;

  return (
    <main className='w-full px-component pb-[10vh] space-y-component'>
      <BudgetSummaryDonut data={data} />
      <InsightCard text='2 categories are over budget' />

      <BudgetUsageStackedBarChart data={data} />
    </main>
  );
}
