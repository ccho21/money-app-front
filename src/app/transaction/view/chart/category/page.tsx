// src/app/transaction/chart/category/page.tsx
'use client';

import { TopCategoryBarChart } from '@/modules/transaction/components/chart/TopCategoryBarChart';
import { useTransactionChartCategory } from '@/modules/transaction/hooks/queries';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { useFilterStore } from '@/stores/useFilterStore';

export default function TransactionChartCategoryPage() {
  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  const [startDate, endDate] = getDateRangeKey().split('_');
  const params: TransactionGroupQuery = {
    timeframe: groupBy,
    startDate,
    endDate,
  };

  const { data, isLoading, error } = useTransactionChartCategory(params);

  return (
    <main className='w-full pb-[10vh] space-y-component'>
      <TopCategoryBarChart />
    </main>
  );
}
