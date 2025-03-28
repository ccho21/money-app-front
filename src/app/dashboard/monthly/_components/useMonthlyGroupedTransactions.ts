import { useEffect, useState } from 'react';
import { api } from '@/features/shared/api';
import {
  TransactionGroupResponse,
  GroupedTransactionSummary,
} from '@/features/transaction/types';

export function useMonthlyGroupedTransactions(year: number) {
  const [groupedData, setGroupedData] = useState<GroupedTransactionSummary[]>(
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await api<TransactionGroupResponse>(
        `/transactions/grouped?range=year&date=${year}&includeEmpty=true`
      );
      setGroupedData(res.data);
    };
    fetch();
  }, [year]);

  return { groupedData };
}
