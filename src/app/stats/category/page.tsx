'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchCategoryStats } from '@/modules/stats/hooks';

import { CategoryType } from '@/modules/category/types';
import { DateFilterParams } from '@/common/types';

import StatsView from '../_components/StatsView';
import { useShallow } from 'zustand/shallow';

export default function StatsCategoryPage() {
  const router = useRouter();

  const { categoryGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      categoryGroup: s.categoryGroup,
      isLoading: s.isLoading,
    }))
  );

  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy, transactionType, date } = query;

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };

    fetchCategoryStats(params);
  }, [date, getDateRangeKey, groupBy, transactionType]);

  return (
    <StatsView
      isLoading={isLoading}
      data={categoryGroup?.items ?? []}
      onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
    />
  );
}
