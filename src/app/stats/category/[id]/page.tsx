'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import { CategoryType } from '@/features/category/types';
import { TransactionGroupItemDTO } from '@/features/transaction/types';
import {
  fetchStatsCategoryByCategoryId,
  fetchStatsSummaryByCategoryId,
} from '@/features/stats/hooks';

import Panel from '@/components/ui/Panel';
import SummaryBox from '@/components/stats/SummaryBox';
import StatComposedChart from '@/components/ui/ComposedChart';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import EmptyMessage from '@/components/ui/EmptyMessage';

export default function StatsCategoryDetailPage() {
  const categoryId = useParams().id;
  const router = useRouter();

  const {
    state: { categoryDetailResponse, statsSummaryCategoryResposne, isLoading },
  } = useStatsStore();

  const resetTopNav = useUIStore((s) => s.resetTopNav);
  const setTopNav = useUIStore((s) => s.setTopNav);

  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { range, transactionType, date } = query;

  // const rangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);
  // const [startDate, endDate] = useMemo(() => rangeKey.split('_'), [rangeKey]);

  // ✅ 바 차트 데이터 가공
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

  // ✅ 상단 네비 설정
  useEffect(() => {
    setTopNav({
      title: statsSummaryCategoryResposne?.categoryName ?? 'Category',
      onBack: () => router.back(),
    });
    return () => resetTopNav();
  }, [setTopNav, resetTopNav, statsSummaryCategoryResposne, router]);

  // ✅ 최초 데이터 fetch
  useEffect(() => {
    if (!categoryId) return;
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');
      const params = {
        startDate,
        endDate,
        type: transactionType as CategoryType,
        groupBy: range,
      };
      await Promise.all([
        fetchStatsSummaryByCategoryId(String(categoryId), params),
        fetchStatsCategoryByCategoryId(String(categoryId), {
          ...params,
          groupBy: 'daily',
        }),
      ]);
    };
    run();
  }, [categoryId, transactionType, range, date, getDateRangeKey]);

  // ✅ 바 차트 클릭 → 쿼리 날짜 이동
  const handleDateClick = (startDate: string) => {
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div>
      {/* 📊 요약 카드 */}
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

      {/* 📈 바 + 라인 차트 */}
      {barData.length > 0 && (
        <div className='w-full h-40'>
          <StatComposedChart
            data={barData}
            onSelect={(startDate) => handleDateClick(startDate)}
          />
        </div>
      )}

      {/* 🧾 일별 거래 리스트 */}
      {categoryDetailResponse && categoryDetailResponse.data.length ? (
        <div className='space-y-4'>
          {categoryDetailResponse.data.map(
            (group: TransactionGroupItemDTO, i: number) => (
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
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
