import { useState, useEffect } from 'react';
import { api } from '@/features/shared/api';
import {
  GroupedTransactionDTO,
  GroupedTransactionSummary,
} from '@/features/transaction/types';

export function useDailyGroupedTransactions() {
  const [groupedData, setGroupedData] = useState<GroupedTransactionSummary[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await api<GroupedTransactionDTO>(
        '/transactions/grouped?range=month&date=2025-03'
      );

      setIncomeTotal(res.incomeTotal);
      setExpenseTotal(res.expenseTotal);
      setGroupedData(res.data);
    };
    fetch();
  }, []);

  return {
    groupedData,
    incomeTotal,
    expenseTotal,
    selectedDate,
    setSelectedDate,
  };
}
