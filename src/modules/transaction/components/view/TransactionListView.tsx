import EmptyMessage from '@/components/ui/message/emptyMessage';
import LoadingMessage from '@/components/ui/message/loadingMessage';
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
    return <LoadingMessage message='Loading transactions...' />;
  }

  if (!data || !data.groups.length) {
    return <EmptyMessage message='No transactions found for this period.' />;
  }

  return (
    <div className='space-y-element'>
      {data.groups.map((group) => (
        <TransactionGroup
          key={group.groupKey}
          label={group.groupKey}
          onTransactionClick={onItemClick}
          onHeaderClick={() => onGroupClick?.(group.groupKey)}
          group={group}
        />
      ))}
    </div>
  );
}
