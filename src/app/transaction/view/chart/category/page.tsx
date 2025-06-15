'use client';

import { useTransactionChartCategory } from '@/modules/transaction/hooks/queries';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import EmptyMessage from '@/components/ui/message/emptyMessage';
import LoadingMessage from '@/components/ui/message/loadingMessage';
import { TopCategoryBarChart } from '@/modules/transaction/components/chart/TopCategoryBarChart';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

export default function TransactionChartCategoryPage() {
  const {
    query: { timeframe },
    getDateRangeKey,
  } = useTransactionFilterStore();

  const [startDate, endDate] = getDateRangeKey().split('_');
  const params: TransactionGroupQuery = {
    startDate,
    endDate,
    timeframe,
  };

  const { data, isLoading, error } = useTransactionChartCategory(params);

  if (isLoading) return <LoadingMessage />;
  if (error) return null;
  if (!data || !data?.topCategories.length) return <EmptyMessage />;

  return (
    <main className='w-full pb-[10vh] space-y-component'>
      <TopCategoryBarChart data={data} />
    </main>
  );
}
