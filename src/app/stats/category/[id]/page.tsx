'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsCategoryByCategoryId } from '@/services/statsService';

import { CategoryType } from '@/features/category/types';
import SummaryBox from '@/components/ui/SummaryBox';
import BudgetBarChart from '../../budget/_components/BudgetBarChart';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { TransactionSummary } from '@/features/transaction/types';
import TransactionGroup from '@/components/common/TransactionGroup';

const MOCK_BAR_DATA = [
  { month: 'Nov', value: 0 },
  { month: 'Dec', value: 0 },
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 32.48 },
  { month: 'Apr', value: 0 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 0 },
  { month: 'July', value: 0 },
  { month: 'Aug', value: 0 },
  { month: 'Oct', value: 0 },
  { month: 'Sep', value: 0 },
];

export default function StatsCategoryDetailPage() {
  const categoryId = useParams().id;

  const {
    state: { categoryDetailResponse, isLoading },
  } = useStatsStore();

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  useEffect(() => {
    const run = async () => {
      if (!categoryId) return;
      const [startDate, endDate] = getDateRangeKey().split('_');

      await fetchStatsCategoryByCategoryId(String(categoryId), {
        startDate,
        endDate,
        type: transactionType as CategoryType,
        groupBy: range,
      });
    };

    run();
  }, [categoryId, getDateRangeKey, range, transactionType]);

  if (isLoading)
    return <p className='text-center mt-10 text-muted'>Loading...</p>;

  if (!categoryDetailResponse || !categoryDetailResponse.data.length) {
    return <EmptyMessage />;
  }

  return (
    <div className='bg-background p-4 pb-[10vh] space-y-4'>
      {/* 헤더 */}
      <div className='text-center space-y-1'>
        <h1 className='text-lg font-bold text-foreground'>Food</h1>
        <p className='text-sm text-muted'>Mar 2025</p>
      </div>

      {/* 요약 */}
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

      {/* 바 차트 */}
      <div className='w-full h-36'>
        <BudgetBarChart
          data={MOCK_BAR_DATA}
          selectedMonth='Mar'
          barColor='var(--color-error)' // 테마 기반 색상
        />
      </div>

      {/* 일별 거래 리스트 */}
      <div className='space-y-4'>
        {categoryDetailResponse.data.map((group: TransactionSummary) => (
          <TransactionGroup
            key={group.label}
            label={group.label}
            rangeStart={group.rangeStart}
            rangeEnd={group.rangeEnd}
            incomeTotal={group.incomeTotal}
            expenseTotal={group.expenseTotal}
            group={group}
          />
        ))}
      </div>
    </div>
  );
}
