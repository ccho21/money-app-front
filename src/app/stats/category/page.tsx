'use client';

import { useEffect, useMemo } from 'react';
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

  const params: DateFilterParams = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };
  }, [getDateRangeKey, groupBy, transactionType, date]);

  useEffect(() => {
    fetchCategoryStats(params);
  }, [params]);

  return (
    <StatsView
      isLoading={isLoading}
      data={categoryGroup?.items ?? []}
      onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
    />
  );
}
