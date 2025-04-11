'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByCatgory } from '@/services/statsService';
import type { CategoryType } from '@/features/category/types';
import StatsView from '../_components/StatsView';

export default function StatsPage() {
  const router = useRouter();

  const {
    state: { isLoading, categoryResponse },
  } = useStatsStore();

  const { query, getDateRangeKey } = useFilterStore();
  const { transactionType, range, date } = query;

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');
      await fetchStatsByCatgory({
        startDate,
        endDate,
        type: transactionType as CategoryType,
      });
    };
    run();
  }, [getDateRangeKey, transactionType, range, date]);

  return (
    <StatsView
      isLoading={isLoading}
      data={categoryResponse?.data ?? []}
      onItemClick={(id: string) => router.push(`/stats/category/${id}`)}
    />
  );
}
