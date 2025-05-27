'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BudgetSummaryDonut } from '@/modules/transaction/components/chart/BudgetSummaryDonut';
import { BudgetUsageStackedBarChart } from '@/modules/transaction/components/chart/BudgetUsageStackedBarChart';
import { useTransactionChartBudget } from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

export default function TransactionChartBudgetPage() {
  const {
    query: { timeframe },
    getDateRangeKey,
  } = useTransactionFilterStore();

  const [startDate, endDate] = getDateRangeKey().split('_');

  const { data, isLoading, error } = useTransactionChartBudget({
    timeframe,
    startDate,
    endDate,
  });

  if (isLoading) return <Skeleton />;
  if (error || !data) return null;

  return (
    <main className='w-full pb-[10vh] space-y-component'>
      <section>
        <BudgetSummaryDonut data={data} />
      </section>

      {/* Optional Insight Example */}
      {/* {data.overBudgetCategories?.length > 0 && (
        <InsightCard text={`${data.overBudgetCategories.length} categories are over budget`} />
      )} */}

      <section>
        <BudgetUsageStackedBarChart data={data} />
      </section>
    </main>
  );
}
