import { useEffect, useState } from 'react';
import { api } from '@/features/shared/api';
import {
  TransactionGroupResponse,
  GroupedTransactions,
} from '@/features/transaction/types';

export function useCalendarDetail(date: string, isOpen: boolean) {
  const [data, setData] = useState<GroupedTransactions | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetch = async () => {
      const res = await api<TransactionGroupResponse>(
        `/transactions/grouped?range=date&date=${date}`
      );

      // ✅ label === baseDate로 정확히 찾기
      const matched = res.data.find((item) => item.label === date);
      setData(matched || null);
    };

    fetch();
  }, [date, isOpen]);

  return { detailData: data };
}
