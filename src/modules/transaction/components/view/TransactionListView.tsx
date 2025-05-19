// src/app/transaction/components/TransactionListView.tsx

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import {
  TransactionGroupListResponse,
  TransactionItem,
} from '../../types/types';
import TransactionGroup from '../TransactionGroup';
interface TransactionListViewProps {
  isLoading: boolean;
  data?: TransactionGroupListResponse | null;
  onItemClick?: (tx: TransactionItem) => void;
  onGroupClick?: (date: string) => void;
}

export default function TransactionListView({
  isLoading,
  data,
  onGroupClick,
  onItemClick,
}: TransactionListViewProps) {
  if (isLoading) {
    return <LoadingMessage />;
  }

  if (!data) {
    return <EmptyMessage />;
  }

  return (
    <>
      {data.groups.map((group) => (
        <TransactionGroup
          key={group.groupKey}
          label={group.groupKey}
          onTransactionClick={(tx: TransactionItem) => {
            onItemClick?.(tx);
          }}
          onHeaderClick={() => {
            onGroupClick?.(group.groupKey);
          }}
          group={group}
        />
      ))}
    </>
  );
}
