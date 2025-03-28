import { useEffect, useMemo, useState } from 'react';
import {
  TransactionGroupResponse,
  GroupedTransactions,
} from '@/features/transaction/types';
import { api } from '@/features/shared/api';

export function useGroupedTransactions(
  year: number,
  month: number,
  type: 'monthly' | 'weekly' | 'yearly' = 'monthly'
) {
  const [groupedData, setGroupedData] = useState<GroupedTransactions[]>([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: TransactionGroupResponse =
          await api<TransactionGroupResponse>(
            `/transactions/grouped?type=${type}&year=${year}&month=${month}`,
            { method: 'GET' }
          );

        if (!res) {
          throw new Error('응답이 비어 있습니다');
        }

        setIncomeTotal(res.incomeTotal);
        setExpenseTotal(res.expenseTotal);
        setGroupedData(res.data);
      } catch (err) {
        console.error(err instanceof Error ? err.message : '거래 요약 오류');
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [type, year, month]);

  return useMemo(
    () => ({
      groupedData,
      incomeTotal,
      expenseTotal,
      selectedDate,
      setSelectedDate,
      isLoading,
    }),
    [groupedData, incomeTotal, expenseTotal, selectedDate, isLoading]
  );
}
