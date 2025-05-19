'use client';

import { DashboardSummary } from '../DashboardSummary';
import { InsightSection } from '../InsightSection';
import { TypographySmall } from '@/components/ui/typography';
import { useFilterStore } from '@/stores/useFilterStore';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchDashboard } from '@/modules/dashboard/hooks';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTransactionStore } from '@/modules/transaction/stores/store';
import { useShallow } from 'zustand/shallow';
import { DashboardCategoryMonthlyDTO } from '../../types';
import { fetchTransactionGroups } from '@/modules/transaction/hooks/fetches';
import Link from 'next/link';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  {
    ssr: false,
  }
);

export function DashboardView() {
  const { query, getDateRangeKey, isInitialized } = useFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const { groupBy, date } = query;

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
  }, [getDateRangeKey, date, isInitialized]);

  const { groupList, isLoading: txLoading } = useTransactionStore(
    useShallow((s) => ({
      groupList: s.groupList,
      isLoading: s.isLoading,
    }))
  );

  const { data, isLoading } = fetchDashboard({
    timeframe: groupBy,
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

  if (isLoading || !data) return <Skeleton className='h-[300px] w-full' />;

  return (
    <section className='space-y-6 px-4 py-6'>
      <DashboardSummary
        totalExpense={`$${(data?.budget?.used ?? 0 / 100).toFixed(2)}`}
        budgetUsage={{
          value: `${data.budget.usageRate}%`,
          delta: data.budget.comparison?.percentChange ?? '',
          deltaDirection: mapTrendToDirection(data.budget.comparison?.trend),
        }}
        monthlySpending={{
          // ✅ 요기 이름 바꿔야 됨
          value: `$${(data.monthlySpending.amount / 100).toFixed(2)}`,
          delta: data.monthlySpending.comparison?.percentChange ?? '',
          deltaDirection: mapTrendToDirection(
            data.monthlySpending.comparison?.trend
          ),
        }}
        categoryList={
          data.categoryMonthly.length > 0
            ? data.categoryMonthly.map((cat: DashboardCategoryMonthlyDTO) => ({
                name: cat.name,
                percent: cat.percent,
                color: cat.color ?? '#ccc',
              }))
            : []
        }
      />

      <InsightSection insights={data.insights} />

      <div className='space-y-2'>
        <TypographySmall>Recent Transactions</TypographySmall>
        <TransactionListView isLoading={txLoading} data={groupList} />
        <div className='text-right'>
          <Link
            href='/transaction/view/list'
            className='text-xs text-blue-600 font-medium hover:underline'
          >
            View all →
          </Link>
        </div>
      </div>
    </section>
  );
}
