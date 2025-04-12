'use client';

import { useEffect, useMemo, useState } from 'react';
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

export default function StatsBudgetDetailPage() {
  const categoryId = useParams().id;
  const router = useRouter();

  const {
    state: { statsSummaryBudgetResposne, budgetDetailResponse, isLoading },
  } = useStatsStore();

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const rangeKey = useMemo(() => getDateRangeKey(), [date, range]);
  const [startDate, endDate] = useMemo(() => rangeKey.split('_'), [rangeKey]);

  const chartData = useMemo(() => {
    if (!statsSummaryBudgetResposne) return [];
    return statsSummaryBudgetResposne.data.map((summary) => ({
      month: summary.label,
      startDate: summary.startDate,
      endDate: summary.endDate,
      value: transactionType === 'expense' ? summary.expense : summary.income,
      isCurrent: summary.isCurrent,
    }));
  }, [statsSummaryBudgetResposne]);

  console.log('## BUDGET BAR DATA', chartData);

  useEffect(() => {
    setTopNav({
      title: statsSummaryBudgetResposne?.categoryName ?? 'Category',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, statsSummaryBudgetResposne]);

  useEffect(() => {
    if (!categoryId) return;
    const params = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy: range,
    };
    Promise.all([
      fetchStatsSummaryByBudget(String(categoryId), params),
      fetchStatsBudgetByCategoryId(String(categoryId), params),
    ]);
  }, [categoryId, startDate, endDate, transactionType, range]);

  if (isLoading)
    return <p className='text-center mt-10 text-muted'>Loading...</p>;

  return (
    <div className=''>
      {/* 헤더 */}
      <div className='text-center space-y-1 py-4'>
        <h1 className='text-lg font-bold text-foreground'>
          {statsSummaryBudgetResposne?.categoryName ?? 'Category'}
        </h1>
        <p className='text-sm text-muted'>
          {startDate} ~ {endDate}
        </p>
      </div>

      {/* 요약 */}
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

      {/* 차트 */}
      {chartData.length > 0 && (
        <Panel>
          <div className='w-full h-36'>
            <ComposedChart data={chartData} onSelect={setSelectedMonth} />
          </div>
        </Panel>
      )}

      {/* 리스트 */}
      {/* <Panel>
        <div className="space-y-4">
          {budgetDetailResponse.data.map((group: TransactionSummary, i) => (
            <TransactionGroup
              key={group.label + i}
              label={group.label}
              rangeStart={group.startDate}
              rangeEnd={group.endDate}
              incomeTotal={group.incomeTotal}
              expenseTotal={group.expenseTotal}
              group={group}
            />
          ))}
        </div>
      </Panel> */}
    </div>
  );
}
