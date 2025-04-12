'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import {
  fetchStatsBudgetByCategoryId,
  fetchStatsSummaryByBudget,
} from '@/services/statsService';

import { CategoryType } from '@/features/category/types';
import SummaryBox from '@/components/ui/SummaryBox';
import EmptyMessage from '@/components/ui/EmptyMessage';
import TransactionGroup from '@/components/common/TransactionGroup';
import Panel from '@/components/ui/Panel';
import ComposedChart from '@/components/ui/ComposedChart';
import { useUIStore } from '@/stores/useUIStore';
import { TransactionSummary } from '@/features/transaction/types';
import { parseISO, startOfDay } from 'date-fns';

export default function StatsBudgetDetailPage() {
  const categoryId = useParams().id;
  const router = useRouter();

  const {
    state: { statsSummaryBudgetResposne, budgetDetailResponse, isLoading },
  } = useStatsStore();

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { date, range, transactionType } = query;

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

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy: range,
    };
    Promise.all([
      fetchStatsSummaryByBudget(String(categoryId), params),
      fetchStatsBudgetByCategoryId(String(categoryId), {
        ...params,
        groupBy: 'daily',
      }),
    ]);
  }, [categoryId, transactionType, range, getDateRangeKey, date]);

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div>
      {/* 요약 패널 */}
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

      {/* 차트 영역 */}
      <Panel>
        {chartData.length > 0 && (
          <div className='w-full h-36'>
            <ComposedChart
              data={chartData}
              onSelect={(start) => {
                // ✅ 클릭한 날짜를 기준으로 범위 변경
                setQuery({ date: startOfDay(parseISO(start)) });
              }}
            />
          </div>
        )}
      </Panel>

      {/* 거래 그룹 리스트 */}
      {budgetDetailResponse && budgetDetailResponse.data.length ? (
        <Panel>
          <div className='space-y-4'>
            {budgetDetailResponse.data.map((group: TransactionSummary, i) => (
              <TransactionGroup
                key={group.label + i}
                label={group.label}
                rangeStart={group.rangeStart}
                rangeEnd={group.rangeEnd}
                incomeTotal={group.incomeTotal}
                expenseTotal={group.expenseTotal}
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
