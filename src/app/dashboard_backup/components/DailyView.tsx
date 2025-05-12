// src/app/dashboard/components/DailyView.tsx

import {
  TransactionDetailDTO,
  TransactionGroupSummaryDTO,
} from '@/modules/transaction/types';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import TransactionGroup from '../../transaction/components/TransactionGroup';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
interface DailyViewProps {
  isLoading: boolean;
  data?: TransactionGroupSummaryDTO | null;
  onTransactionClick?: (tx: TransactionDetailDTO) => void;
  onHeaderClick?: (date: string) => void;
}

//
// DailyView displays grouped transactions and a summary box.
//
export default function DailyView({
  isLoading,
  data,
  onTransactionClick,
  onHeaderClick,
}: DailyViewProps) {
  if (isLoading) {
    return <LoadingMessage />;
  }

  if (!data) {
    return <EmptyMessage />;
  }

  return (
    <div className='p-compact'>
      {data.items.map((group) => (
        <TransactionGroup
          key={group.label}
          label={group.label}
          rangeStart={group.rangeStart}
          rangeEnd={group.rangeEnd}
          groupIncome={group.groupIncome}
          groupExpense={group.groupExpense}
          onTransactionClick={(tx: TransactionDetailDTO) => {
            onTransactionClick?.(tx);
          }}
          onHeaderClick={() => {
            onHeaderClick?.(group.label);
          }}
          group={group}
          className='mb-element'
        />
      ))}
    </div>
  );
}
