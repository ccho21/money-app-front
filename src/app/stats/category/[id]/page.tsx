'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import {
  fetchStatsCategoryByCategoryId,
  fetchStatsSummaryByCategoryId,
} from '@/features/stats/hooks';
import { CategoryType } from '@/features/category/types';

import Panel from '@/components/ui/check/Panel';
import SummaryBox from '@/components/stats/SummaryBox';
import StatComposedChart from '@/components/ui/check/ComposedChart';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import EmptyMessage from '@/components/ui/check/EmptyMessage';

//
// Category detail stats page
//
export default function StatsCategoryDetailPage() {
  const { id: categoryId } = useParams();
  const router = useRouter();

  const { categoryDetailResponse, categorySummaryResponse, isLoading } =
    useStatsStore((s) => s.state);

  const resetTopNav = useUIStore((s) => s.resetTopNav);
  const setTopNav = useUIStore((s) => s.setTopNav);

  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { groupBy, transactionType, date } = query;

  //
  // Construct params for API calls
  //
  const statsParams = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy: groupBy,
    };
  }, [getDateRangeKey, transactionType, groupBy, date]);

  //
  // Fetch detail + summary data on mount or param change
  //
  useEffect(() => {
    if (!categoryId) return;
    fetchStatsSummaryByCategoryId(String(categoryId), statsParams);
    fetchStatsCategoryByCategoryId(String(categoryId), {
      ...statsParams,
      groupBy: 'daily',
    });
  }, [categoryId, statsParams]);

  //
  // Set top nav title from summary
  //
  useEffect(() => {
    setTopNav({
      title: categorySummaryResponse?.categoryName ?? 'Category',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, categorySummaryResponse, router]);

  //
  // Build chart data
  //
  const barData = useMemo(() => {
    if (!categorySummaryResponse?.data) return [];
    return categorySummaryResponse.data.map((summary) => ({
      month: summary.label,
      startDate: summary.startDate,
      endDate: summary.endDate,
      value: transactionType === 'expense' ? summary.expense : summary.income,
      isCurrent: summary.isCurrent,
    }));
  }, [categorySummaryResponse, transactionType]);

  //
  // Handle bar chart click
  //
  const handleDateClick = (startDate: string) => {
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div className='space-y-4'>
      {/* Summary section */}
      {categoryDetailResponse && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Income',
                value: categoryDetailResponse.incomeTotal,
                color:
                  categoryDetailResponse.incomeTotal > 0
                    ? 'text-primary'
                    : 'text-muted',
                prefix: '$',
              },
              {
                label: 'Exp.',
                value: categoryDetailResponse.expenseTotal,
                color:
                  categoryDetailResponse.expenseTotal > 0
                    ? 'text-error'
                    : 'text-muted',
                prefix: '$',
              },
              {
                label: 'Total',
                value:
                  categoryDetailResponse.incomeTotal -
                  categoryDetailResponse.expenseTotal,
                color: 'text-foreground',
                prefix: '$',
              },
            ]}
          />
        </Panel>
      )}

      {/* Chart section */}
      {barData.length > 0 && (
        <div className='w-full h-40'>
          <StatComposedChart data={barData} onSelect={handleDateClick} />
        </div>
      )}

      {/* Transaction breakdown */}
      {categoryDetailResponse?.data?.length ? (
        <div className='space-y-4'>
          {categoryDetailResponse.data.map((group, i) => (
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
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
