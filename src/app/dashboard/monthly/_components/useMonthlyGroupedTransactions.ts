import { useEffect, useState } from "react";
import { api } from "@/features/shared/api";
import {
  GroupedTransactionDTO,
  GroupedTransactionSummary,
} from "@/features/transaction/types";

export function useMonthlyGroupedTransactions(year: number) {
  const [groupedData, setGroupedData] = useState<GroupedTransactionSummary[]>(
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await api<GroupedTransactionDTO>(
        `/transactions/grouped?range=year&date=${year}&includeEmpty=true`
      );
      setGroupedData(res.data);
    };
    fetch();
  }, [year]);

  return { groupedData };
}
