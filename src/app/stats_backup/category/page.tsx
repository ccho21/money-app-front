// src/app/stats/category/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStatsStore } from '@/modules/stats/store';
import { fetchCategoryStats } from '@/modules/stats/hooks';
import { CategoryType } from '@/modules/category/types';
import { DateFilterParams } from '@/common/types';
import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/shallow';
import dynamic from 'next/dynamic';

const StatsView = dynamic(
  () => import('@/app/stats/category/_components/StatsView'),
  {
    ssr: false,
  }
);
export default function StatsCategoryPage() {
  const router = useRouter();

  const { categoryGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      categoryGroup: s.categoryGroup,
      isLoading: s.isLoading,
    }))
  );

  const { query, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, transactionType, date } = query;

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };

    fetchCategoryStats(params);
  }, [date, groupBy, transactionType, getDateRangeKey, isInitialized]);

  return (
    <div className=''>
      <StatsView
        isLoading={isLoading}
        data={categoryGroup?.items ?? []}
        onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
      />
    </div>
  );
}
