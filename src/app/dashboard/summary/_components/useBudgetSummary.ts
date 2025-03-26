// ✅ 파일 경로: src/app/dashboard/summary/_components/useSummaryData.ts

'use client';

import { useEffect, useState } from 'react';
import { SummaryResponse } from '@/features/summary/types';
import { api } from '@/features/shared/api';

export function useBudgetSummary() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const res = await api<SummaryResponse>(
          `/analysis/summary?year=${year}&month=${month}`
        );

        setData(res);
      } catch (error) {
        console.error('📛 Failed to fetch summary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { summary: data, loading };
}
