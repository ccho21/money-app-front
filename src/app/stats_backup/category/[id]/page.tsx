'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';
import dynamic from 'next/dynamic';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';

import { fetchBudgetSummary, fetchBudgetDetail } from '@/modules/stats/hooks';
import { CategoryType } from '@/modules/category/types';

import SummaryBox from '@/components/common/SummaryBox';
import TransactionGroup from '@/components_backup/transaction/TransactionGroup';
import Panel from '@/components_backup/ui/panel/Panel';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import { useShallow } from 'zustand/shallow';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';

const ComposedChart = dynamic(
  () => import('@/components_backup/common/ComposedChart'),
  {
    ssr: false,
    loading: () => (
      <div className='h-36 bg-muted/20 animate-pulse rounded-md' />
    ),
  }
);

export default function StatsBudgetDetailPage() {
  const { id: categoryId } = useParams();
  const router = useRouter();

  const { groupBy, transactionType } = useFilterStore((s) => s.query);
  const { getDateRangeKey, setQuery } = useFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = useMemo(
    () => ({
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy,
    }),
    [startDate, endDate, groupBy, transactionType]
  );

  const { budgetSummary, budgetDetail, isLoading, setBudgetDetail } =
    useStatsStore(
      useShallow((s) => ({
        budgetSummary: s.budgetSummary,
        budgetDetail: s.budgetDetail,
        isLoading: s.isLoading,
        setBudgetDetail: s.setBudgetDetail,
      }))
    );

  useTopNavPreset({
    title: 'Budget',
    onBack: () => router.back(),
  });

  // fetch summary & detail
  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      const data = await fetchBudgetSummary(String(categoryId), params);
      const exists = data.items.find((d) => d.isCurrent);

      if (exists?.income || exists?.expense) {
        fetchBudgetDetail(String(categoryId), {
          ...params,
          groupBy: 'daily',
        });
      } else {
        setBudgetDetail(null);
      }
    };

    fetchData();
  }, [categoryId, params, setBudgetDetail]);

  const chartData = useMemo(() => {
    if (!budgetSummary?.items) return [];
    return budgetSummary.items.map((item) => ({
      month: item.label,
      startDate: item.rangeStart,
      endDate: item.rangeEnd,
      value: transactionType === 'expense' ? item.expense : item.income,
      isCurrent: item.isCurrent,
    }));
  }, [budgetSummary, transactionType]);

  const summaryData = useMemo(() => {
    const current = budgetSummary?.items.find((item) => item.isCurrent);
    const budgetAmount = current?.budgetAmount ?? 0;
    const income = current?.income ?? 0;
    const expense = current?.expense ?? 0;

    return {
      budgetAmount,
      income,
      expense,
      remaining: budgetAmount - expense,
    };
  }, [budgetSummary]);

  if (isLoading) return <LoadingMessage />;

  return (
    <div className='space-y-4'>
      {/* Summary */}
      {budgetSummary && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Budget',
                value: summaryData.budgetAmount,
                color: 'text-primary',
              },
              {
                label: 'Exp.',
                value: summaryData.expense,
                color: 'text-error',
              },
              {
                label: 'Remaining',
                value: summaryData.remaining,
                color: budgetSummary.summary?.isOver
                  ? 'text-error'
                  : 'text-foreground',
              },
            ]}
          />
        </Panel>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <Panel>
          <div className='w-full h-36'>
            <ComposedChart
              data={chartData}
              onSelect={(startDate) =>
                setQuery({ date: startOfDay(parseISO(startDate)) })
              }
            />
          </div>
        </Panel>
      )}

      {/* Breakdown */}
      {budgetDetail?.items.length ? (
        <Panel>
          <div className='space-y-4'>
            {budgetDetail.items.map((group, i) => (
              <TransactionGroup
                key={group.label + i}
                label={group.label}
                rangeStart={group.rangeStart}
                rangeEnd={group.rangeEnd}
                groupIncome={group.groupIncome}
                groupExpense={group.groupExpense}
                group={group}
              />
            ))}
          </div>
        </Panel>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
