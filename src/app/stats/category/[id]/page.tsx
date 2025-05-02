// src/app/stats/category/[id]/page.tsx
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
import StatComposedChart from '@/components/common/ComposedChart';
import Panel from '@/components/ui/panel/Panel';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import { useShallow } from 'zustand/shallow';
import LoadingMessage from '@/components/ui/loading-message/LoadingMessage';

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

  const { categoryDetail, categorySummary, isLoading, setCategoryDetail } =
    useStatsStore(
      useShallow((s) => ({
        categoryDetail: s.categoryDetail,
        categorySummary: s.categorySummary,
        isLoading: s.isLoading,
        setCategoryDetail: s.setCategoryDetail,
      }))
    );

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  // Fetch detail + summary
  useEffect(() => {
    if (!categoryId) return;

    (async () => {
      const data = await fetchCategorySummary(String(categoryId), params);

      const exists = data.items.find(
        (d) => d.isCurrent && (d.income > 0 || d.expense > 0)
      );
      if (exists) {
        fetchCategoryDetail(String(categoryId), {
          ...params,
          groupBy: 'daily',
        });
      } else {
        setCategoryDetail(null);
      }
    })();
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

  const summaryData = useMemo(() => {
    if (!categorySummary || !categorySummary.items.length) {
      return { income: 0, expense: 0, total: 0 };
    }

    const current = categorySummary.items.find((item) => item.isCurrent);
    if (!current) {
      return { income: 0, expense: 0, total: 0 };
    }
    return {
      income: current.income,
      expense: current.expense,
      total: current.income - current.expense,
    };
  }, [categorySummary]);

  const handleDateClick = (startDate: string) => {
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <div className='space-y-4'>
      {/* Summary section */}
      {categorySummary && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Income',
                value: summaryData.income,
                color: summaryData.income > 0 ? 'text-primary' : 'text-muted',
              },
              {
                label: 'Exp.',
                value: summaryData.expense,
                color: summaryData.expense > 0 ? 'text-error' : 'text-muted',
              },
              {
                label: 'Total',
                value: summaryData.income - summaryData.expense,
                color: 'text-foreground',
              },
            ]}
          />
        </Panel>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <div>
          <StatComposedChart data={chartData} onSelect={handleDateClick} />
        </div>
      )}

      {/* Transaction breakdown */}
      {categoryDetail?.items?.length ? (
        <div>
          {categoryDetail.items.map((group, i) => (
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
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
