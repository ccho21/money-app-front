'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import {
  fetchStatsCategoryByCategoryId,
  fetchStatsSummaryByCategoryId,
} from '@/services/statsService';

import { CategoryType } from '@/features/category/types';
import SummaryBox from '@/components/ui/SummaryBox';
import { TransactionSummary } from '@/features/transaction/types';
import TransactionGroup from '@/components/common/TransactionGroup';
import StatComposedChart from '@/components/ui/ComposedChart';
import { useUIStore } from '@/stores/useUIStore';

export default function StatsCategoryDetailPage() {
  const categoryId = useParams().id;
  const router = useRouter();

  const {
    state: { categoryDetailResponse, statsSummaryCategoryResposne, isLoading },
  } = useStatsStore();

  const resetTopNav = useUIStore((s) => s.resetTopNav);
  const setTopNav = useUIStore((s) => s.setTopNav);

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();

  const rangeKey = useMemo(() => getDateRangeKey(), [date, range]);

  const [startDate, endDate] = useMemo(() => rangeKey.split('_'), [rangeKey]);

  const barData = useMemo(() => {
    if (!statsSummaryCategoryResposne) return [];
    return statsSummaryCategoryResposne.data.map((summary) => ({
      month: summary.label,
      startDate: summary.startDate,
      endDate: summary.endDate,
      value: transactionType === 'expense' ? summary.expense : summary.income,
      isCurrent: summary.isCurrent,
    }));
  }, [statsSummaryCategoryResposne, transactionType]);

  useEffect(() => {
    setTopNav({
      title: 'Category.',
      onBack: () => {
        router.back();
      },
    });

    return () => {
      resetTopNav();
    };
  }, [setTopNav]);

  useEffect(() => {
    if (!categoryId) return;

    (async () => {
      const params = {
        startDate,
        endDate,
        type: transactionType as CategoryType,
        groupBy: range,
      };
      Promise.all([
        fetchStatsSummaryByCategoryId(String(categoryId), params),
        fetchStatsCategoryByCategoryId(String(categoryId), params),
      ]);
    })();
  }, [categoryId, startDate, endDate, transactionType, range]);

  if (isLoading)
    return <p className='text-center mt-10 text-muted'>Loading...</p>;

  const selectedName = statsSummaryCategoryResposne?.categoryName ?? 'Category';

  return (
    <div>
      {/* 헤더 */}
      <div className='text-center space-y-1'>
        <h1 className='text-lg font-bold text-foreground'>{selectedName}</h1>
        <p className='text-sm text-muted'>{rangeKey}</p>
      </div>

      {/* 요약 */}
      {categoryDetailResponse && (
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
      )}

      {/* 바 차트 */}
      {barData.length > 0 && (
        <div className='w-full h-36'>
          <StatComposedChart data={barData} onSelect={setSelectedMonth} />
        </div>
      )}

      {/* 거래 리스트 */}
      {categoryDetailResponse && (
        <div className='space-y-4'>
          {categoryDetailResponse?.data.map(
            (group: TransactionSummary, i: number) => (
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
      )}
    </div>
  );
}
