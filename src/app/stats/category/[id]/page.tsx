'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import {
  fetchCategoryDetail,
  fetchCategorySummary,
} from '@/modules/stats/hooks';
import { CategoryType } from '@/modules/category/types';

import SummaryBox from '@/components/stats/SummaryBox';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import StatComposedChart from '@/components/ui/check/ComposedChart';
import Panel from '@/components/ui/check/Panel';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import { useShallow } from 'zustand/shallow';

export default function StatsCategoryDetailPage() {
  const router = useRouter();
  const { id: categoryId } = useParams();

  const { groupBy, transactionType } = useFilterStore((s) => s.query);
  const { getDateRangeKey, setQuery } = useFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = useMemo(
    () => ({
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    }),
    [startDate, endDate, groupBy, transactionType]
  );

  const { categoryDetail, categorySummary, isLoading } = useStatsStore(
    useShallow((s) => ({
      categoryDetail: s.categoryDetail,
      categorySummary: s.categorySummary,
      isLoading: s.isLoading,
    }))
  );

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  // Fetch detail + summary
  useEffect(() => {
    if (!categoryId) return;
    fetchCategorySummary(String(categoryId), params);
    fetchCategoryDetail(String(categoryId), { ...params, groupBy: 'daily' });
  }, [categoryId, params]);

  // Set top nav title
  useEffect(() => {
    setTopNav({
      title: 'Category',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, categorySummary, router]);

  const chartData = useMemo(() => {
    if (!categorySummary || !categorySummary.items.length) return [];
    return categorySummary.items.map((item) => ({
      month: item.label,
      startDate: item.rangeStart,
      endDate: item.rangeEnd,
      value: transactionType === 'expense' ? item.expense : item.income,
      isCurrent: item.isCurrent,
    }));
  }, [categorySummary, transactionType]);

  const handleDateClick = (startDate: string) => {
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div className='space-y-4'>
      {/* Summary section */}
      {categoryDetail && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Income',
                value: categoryDetail.totalIncome,
                color:
                  categoryDetail.totalIncome > 0
                    ? 'text-primary'
                    : 'text-muted',
                prefix: '$',
              },
              {
                label: 'Exp.',
                value: categoryDetail.totalExpense,
                color:
                  categoryDetail.totalExpense > 0 ? 'text-error' : 'text-muted',
                prefix: '$',
              },
              {
                label: 'Total',
                value: categoryDetail.totalIncome - categoryDetail.totalExpense,
                color: 'text-foreground',
                prefix: '$',
              },
            ]}
          />
        </Panel>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <div className='w-full h-40'>
          <StatComposedChart data={chartData} onSelect={handleDateClick} />
        </div>
      )}

      {/* Transaction breakdown */}
      {categoryDetail?.data?.length ? (
        <div className='space-y-4'>
          {categoryDetail.data.map((group, i) => (
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
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
