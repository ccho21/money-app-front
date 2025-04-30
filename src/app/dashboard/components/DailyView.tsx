import {
  TransactionDetailDTO,
  TransactionGroupSummaryDTO,
} from '@/modules/transaction/types';
import SummaryBox from '@/components/stats/SummaryBox';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import Panel from '@/components/ui/panel/Panel';
import TransactionGroup from '../../../components/transaction/TransactionGroup';
import { SummaryItem } from '@/common/types';
interface DailyViewProps {
  isLoading: boolean;
  data?: TransactionGroupSummaryDTO | null;
  summaryItems: SummaryItem[];
  onTransactionClick?: (tx: TransactionDetailDTO) => void;
  onHeaderClick?: (date: string) => void;
}

//
// DailyView displays grouped transactions and a summary box.
//
export default function DailyView({
  isLoading,
  data,
  summaryItems,
  onTransactionClick,
  onHeaderClick,
}: DailyViewProps) {
  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
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
      </Panel>
    </>
  );
}
