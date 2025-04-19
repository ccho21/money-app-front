'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import {
  fetchStatsBudgetByCategoryId,
  fetchStatsSummaryByBudget,
} from '@/features/stats/hooks';

import { CategoryType } from '@/features/category/types';
import { TransactionGroupItemDTO } from '@/features/transaction/types';

import Panel from '@/components/ui/check/Panel';
import SummaryBox from '@/components/stats/SummaryBox';
import ComposedChart from '@/components/ui/check/ComposedChart';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import EmptyMessage from '@/components/ui/check/EmptyMessage';

export default function StatsBudgetDetailPage() {
  const categoryId = useParams().id;
  const router = useRouter();

  const {
    state: { statsSummaryBudgetResposne, budgetDetailResponse, isLoading },
  } = useStatsStore();

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { date, groupBy, transactionType } = query;

  const rangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);

  const chartData = useMemo(() => {
    if (!statsSummaryBudgetResposne) return [];
    return statsSummaryBudgetResposne.data.map((summary) => ({
      month: summary.label,
      startDate: summary.startDate,
      endDate: summary.endDate,
      value: transactionType === 'expense' ? summary.expense : summary.income,
      isCurrent: summary.isCurrent,
    }));
  }, [statsSummaryBudgetResposne, transactionType]);

  useEffect(() => {
    setTopNav({
      title: statsSummaryBudgetResposne?.categoryName ?? 'Budget',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, statsSummaryBudgetResposne, router]);

  useEffect(() => {
    if (!categoryId) return;

    const [startDate, endDate] = rangeKey.split('_');
    const params = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy: groupBy,
    };

    Promise.all([
      fetchStatsSummaryByBudget(String(categoryId), params),
      fetchStatsBudgetByCategoryId(String(categoryId), {
        ...params,
        groupBy: 'daily',
      }),
    ]);
  }, [categoryId, rangeKey, transactionType, groupBy, date]);

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div>
      {/* 요약 정보 */}
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Budget',
              value: statsSummaryBudgetResposne?.totalBudget ?? 0,
              color: 'text-primary',
              prefix: '$',
            },
            {
              label: 'Exp.',
              value: statsSummaryBudgetResposne?.totalExpense ?? 0,
              color: 'text-error',
              prefix: '$',
            },
            {
              label: 'Remaining',
              value: statsSummaryBudgetResposne?.totalRemaining ?? 0,
              color: statsSummaryBudgetResposne?.isOver
                ? 'text-error'
                : 'text-foreground',
              prefix: '$',
            },
          ]}
        />
      </Panel>

      {/* 바 차트 */}
      {chartData.length > 0 && (
        <Panel>
          <div className='w-full h-36'>
            <ComposedChart
              data={chartData}
              onSelect={(startDate) => {
                setQuery({ date: startOfDay(parseISO(startDate)) });
              }}
            />
          </div>
        </Panel>
      )}

      {/* 거래 리스트 */}
      {budgetDetailResponse?.data.length ? (
        <Panel>
          <div className='space-y-4'>
            {budgetDetailResponse.data.map(
              (group: TransactionGroupItemDTO, i) => (
                <TransactionGroup
                  key={group.label + i}
                  label={group.label}
                  rangeStart={group.rangeStart}
                  rangeEnd={group.rangeEnd}
                  incomeTotal={group.incomeTotal}
                  expenseTotal={group.expenseTotal}
                  group={group}
                />
              )
            )}
          </div>
        </Panel>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
