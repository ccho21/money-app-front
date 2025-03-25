import { useEffect, useState } from 'react';
import { api } from '@/features/shared/api';

export type Summary = {
  date: string;
  income: number;
  expense: number;
};

export function useCalendarSummary(month = '2025-03') {
  const [monthSummary, setMonthSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api<Summary[]>(`/transactions/calendar?month=${month}`);
      setMonthSummary(res);
    };
    fetch();
  }, [month]);

  return { monthSummary };
}
