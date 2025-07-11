'use client';

import EmptyMessage from '@/components/ui/message/emptyMessage';
import LoadingMessage from '@/components/ui/message/loadingMessage';
import { AccountBarChart } from '@/modules/transaction/components/chart/AccountBarChart';
import { useTransactionChartAccount } from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { TransactionGroupQuery } from '@/modules/transaction/types/types';

export default function TransactionChartAccountPage() {
  const {
    query: { timeframe },
    getDateRangeKey,
  } = useTransactionFilterStore();

  const [startDate, endDate] = getDateRangeKey().split('_');
  const params: TransactionGroupQuery = {
    timeframe,
    startDate,
    endDate,
  };

  const { data, isLoading, error } = useTransactionChartAccount(params);

  if (isLoading) return <LoadingMessage />;
  if (error) return null;
  if (!data || !data.accounts.length) return <EmptyMessage />;

  return (
    <main className='w-full pb-[10vh] space-y-component'>
      <AccountBarChart data={data} />
    </main>
  );
}
