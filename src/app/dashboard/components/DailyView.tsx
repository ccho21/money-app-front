// src/app/dashboard/components/DailyView.tsx

import {
  TransactionDetailDTO,
  TransactionGroupSummaryDTO,
} from '@/modules/transaction/types';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import TransactionGroup from '../../../components/transaction/TransactionGroup';
import LoadingMessage from '@/components/ui/loading-message/LoadingMessage';
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
    <>
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
        />
      ))}
    </>
  );
}
