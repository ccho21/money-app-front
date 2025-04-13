'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByCatgory } from '@/features/stats/hooks';
import type { CategoryType } from '@/features/category/types';
import StatsView from '../_components/StatsView';
import { DateFilterParams } from '@/features/shared/types';

export default function StatsPage() {
  const router = useRouter();

  const {
    state: { isLoading, categoryResponse },
  } = useStatsStore();

  const { query, getDateRangeKey } = useFilterStore();
  const { transactionType, date } = query;

  const dateRangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);
  const [start, end] = dateRangeKey.split('_');

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
    };

    fetchStatsByCatgory(params);
  }, [transactionType, dateRangeKey, date]);

  return (
    <StatsView
      isLoading={isLoading}
      data={categoryResponse?.data ?? []}
      startDate={start}
      endDate={end}
      onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
    />
  );
}
