'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { fetchDashboard } from '@/modules/dashboard/hooks/queries';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTransactionStore } from '@/modules/transaction/stores/store';
import { useShallow } from 'zustand/shallow';
import { fetchTransactionGroups } from '@/modules/transaction/hooks/fetches';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

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
  const { query, getDateRangeKey, isInitialized } = useTransactionFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const { timeframe } = query;

  useEffect(() => {
    if (!isInitialized) return;

    const params: TransactionGroupQuery = {
      timeframe: 'monthly',
      startDate,
      endDate,
      limit: 3,
    };

    (async () => {
      Promise.all([fetchTransactionGroups(params)]);
    })();
  }, [getDateRangeKey, isInitialized]);

  const { groupList, isLoading: txLoading } = useTransactionStore(
    useShallow((s) => ({
      groupList: s.groupList,
      isLoading: s.isLoading,
    }))
  );

  const { data, isLoading } = fetchDashboard({
    timeframe: timeframe,
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
    return <Skeleton className='h-[300px] w-full' />;
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
          color: cat.color ?? 'hsl(var(--chart-1))',
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
