'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useDashboard } from '@/modules/dashboard/hooks/queries';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTransactionGroupsQuery } from '@/modules/transaction/hooks/queries';
import { useMemo } from 'react';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  { ssr: false }
);
const InsightSection = dynamic(() => import('../InsightSection'), {
  ssr: false,
});
const DashboardSummary = dynamic(() => import('../DashboardSummary'), {
  ssr: false,
});

export function DashboardView() {
  const { query, getDateRangeKey } = useTransactionFilterStore();
  const [startDate, endDate] = useMemo(
    () => getDateRangeKey().split('_'),
    [getDateRangeKey]
  );
  const { timeframe } = query;

  const groupQueryParams = useMemo<TransactionGroupQuery>(
    () => ({
      timeframe: 'monthly',
      startDate,
      endDate,
      limit: 3,
    }),
    [startDate, endDate]
  );

  const { data: groupList, isLoading: txLoading } =
    useTransactionGroupsQuery(groupQueryParams);

  const { data, isLoading } = useDashboard({
    timeframe,
    startDate,
    endDate,
  });

  const mapTrendToDirection = (
    trend?: 'increase' | 'decrease'
  ): 'up' | 'down' | undefined => {
    if (trend === 'increase') return 'up';
    if (trend === 'decrease') return 'down';
    return undefined;
  };

  if (isLoading || !data) {
    return (
      <Skeleton data-testid='dashboard-loading' className='h-[300px] w-full' />
    );
  }

  return (
    <main className='bg-background text-foreground space-y-component px-component py-component'>
      <DashboardSummary
        totalExpense={data?.budget?.used ?? 0}
        budgetUsage={{
          value: `${data.budget.usageRate}%`,
          delta: data.budget.comparison?.percentChange ?? '',
          deltaDirection: mapTrendToDirection(data.budget.comparison?.trend),
        }}
        monthlySpending={{
          value: data.monthlySpending.amount,
          delta: data.monthlySpending.comparison?.percentChange ?? '',
          deltaDirection: mapTrendToDirection(
            data.monthlySpending.comparison?.trend
          ),
        }}
        categoryList={data.categoryMonthly.map((cat) => ({
          name: cat.name,
          percent: cat.percent,
          color: cat.color ?? 'var(--chart-1)',
        }))}
      />

      <section>
        <InsightSection insights={data.insights} />
      </section>

      <section>
        <h2 className='text-heading font-bold' role='heading' aria-level={3}>
          Recent Transactions
        </h2>
        <TransactionListView isLoading={txLoading} data={groupList} />

        <div className='mt-component'>
          <Link
            href='/transaction/view/list'
            className='flex items-center justify-end text-label text-primary hover:underline'
          >
            View all <ArrowRight className='ml-1 w-4 h-4'></ArrowRight>
          </Link>
        </div>
      </section>
    </main>
  );
}
