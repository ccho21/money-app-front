import { useEffect, useState } from 'react';
import { api } from '@/features/shared/api';
import { SummaryResponse } from '@/features/summary/types';

export function useSummaryData() {
  const [data, setData] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await api<SummaryResponse>('/analysis/summary');
      setData(res);
    };
    fetch();
  }, []);

  return { summary: data };
}
