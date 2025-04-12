'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByCatgory } from '@/services/statsService';
import type { CategoryType } from '@/features/category/types';
import StatsView from '../_components/StatsView';
import { DateFilterParams } from '@/features/shared/types';

export default function StatsPage() {
  const router = useRouter();

  const {
    state: { isLoading, categoryResponse },
  } = useStatsStore();

  const { query, getDateRangeKey } = useFilterStore();
  const { transactionType } = query;

  const dateRangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);
  const lastFetchKey = useRef<string | null>(null);
  const [start, end] = dateRangeKey.split('_');
  useEffect(() => {
    const currentKey = `${transactionType}_${dateRangeKey}`;
    if (currentKey === lastFetchKey.current) return;

    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
    };

    fetchStatsByCatgory(params);
    lastFetchKey.current = currentKey;
  }, [transactionType, dateRangeKey]);

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
