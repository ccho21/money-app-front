'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByCategory } from '@/features/stats/hooks';
import StatsView from '../_components/StatsView';
import { DateFilterParams } from '@/shared/types';
import { CategoryType } from '@/features/category/types';

//
// Category stats page - shows breakdown by category
//
export default function StatsCategoryPage() {
  const router = useRouter();

  const { categoryResponse, isLoading } = useStatsStore((s) => s.state);
  const { query, getDateRangeKey } = useFilterStore();
  const { transactionType, groupBy } = query;

  //
  // Memoize the query params
  //
  const params: DateFilterParams = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };
  }, [getDateRangeKey, groupBy, transactionType]);

  //
  // Fetch category stats on param change
  //
  useEffect(() => {
    fetchStatsByCategory(params);
  }, [params]);

  return (
    <StatsView
      isLoading={isLoading}
      data={categoryResponse?.items ?? []}
      startDate={params.startDate}
      endDate={params.endDate}
      onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
    />
  );
}
