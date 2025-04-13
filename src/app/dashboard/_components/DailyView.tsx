import {
  Transaction,
  TransactionSummaryResponse,
} from '@/features/transaction/types';
import SummaryBox from '@/components/stats/SummaryBox';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';
import TransactionGroup from '../../../components/transaction/TransactionGroup';
import { SummaryItem } from '@/features/shared/types';

interface DailyViewProps {
  isLoading: boolean;
  data?: TransactionSummaryResponse | null;
  summaryItems: SummaryItem[];
  onTransactionClick?: (tx: Transaction) => void;
  onHeaderClick?: (date: string) => void;
}

export default function DailyView({
  isLoading,
  data,
  summaryItems,
  onTransactionClick,
  onHeaderClick,
}: DailyViewProps) {
  if (isLoading) {
    return <p className='text-center mt-10 text-mute'>불러오는 중...</p>;
  }

  if (!data) {
    return <EmptyMessage />;
  }

  return (
    <>
      <Panel>
        <SummaryBox items={summaryItems} />
      </Panel>

      <Panel>
        {data.data.map((group) => (
          <TransactionGroup
            key={group.label}
            label={group.label}
            rangeStart={group.rangeStart}
            rangeEnd={group.rangeEnd}
            incomeTotal={group.incomeTotal}
            expenseTotal={group.expenseTotal}
            group={group}
            onTransactionClick={(tx: Transaction) => {
              onTransactionClick?.(tx);
            }}
            onHeaderClick={() => {
              onHeaderClick?.(group.label);
            }}
          />
        ))}
      </Panel>
    </>
  );
}
