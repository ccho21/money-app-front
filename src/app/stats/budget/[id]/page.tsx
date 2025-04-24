'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import { fetchBudgetSummary, fetchBudgetDetail } from '@/modules/stats/hooks';

import { CategoryType } from '@/modules/category/types';
import { TransactionGroupItemDTO } from '@/modules/transaction/types';

import SummaryBox from '@/components/stats/SummaryBox';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import Panel from '@/components/ui/check/Panel';
import ComposedChart from '@/components/ui/check/ComposedChart';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import { useShallow } from 'zustand/shallow';

export default function StatsBudgetDetailPage() {
  const { id: categoryId } = useParams();
  const router = useRouter();

  const { groupBy, transactionType, date } = useFilterStore((s) => s.query);
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

  const { budgetSummary, budgetDetail, isLoading } = useStatsStore(
    useShallow((s) => ({
      budgetSummary: s.budgetSummary,
      budgetDetail: s.budgetDetail,
      isLoading: s.isLoading,
    }))
  );

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  useEffect(() => {
    if (!categoryId) return;

    fetchBudgetSummary(String(categoryId), params);
    fetchBudgetDetail(String(categoryId), { ...params, groupBy: 'daily' });
  }, [categoryId, params]);

  useEffect(() => {
    setTopNav({
      title: 'Budget',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, budgetSummary, router]);

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

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div className='space-y-4'>
      {/* 요약 정보 */}
      {budgetSummary && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Budget',
                value: budgetSummary.summary?.budgetAmount ?? 0,
                color: 'text-primary',
                prefix: '$',
              },
              {
                label: 'Exp.',
                value: budgetSummary.summary?.expense ?? 0,
                color: 'text-error',
                prefix: '$',
              },
              {
                label: 'Remaining',
                value: budgetSummary.summary?.remaining ?? 0,
                color: budgetSummary.summary?.isOver
                  ? 'text-error'
                  : 'text-foreground',
                prefix: '$',
              },
            ]}
          />
        </Panel>
      )}

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
      {budgetDetail?.data?.length ? (
        <Panel>
          <div className='space-y-4'>
            {budgetDetail.data.map((group, i) => (
              <TransactionGroup
                key={group.label + i}
                label={group.label}
                rangeStart={group.rangeStart}
                rangeEnd={group.rangeEnd}
                groupIncome={group.income}
                groupExpense={group.expense}
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
