import { useEffect, useState } from 'react';
import { api } from '@/features/shared/api';
import { TransactionDailyGrouped, TransactionDTO } from '@/features/transaction/types';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  note?: string;
};

export function useCalendarDetail(date: string, isOpen: boolean) {
  const [data, setData] = useState<TransactionDTO | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const fetch = async () => {
      const res = await api<TransactionDTO>(`/transactions?range=date&date=${date}`);
      setData(res);
    };
    fetch();
  }, [date, isOpen]);

  return { detailData: data };
}
