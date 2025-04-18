'use client';

import SummaryBox from '@/components/stats/SummaryBox';
import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';
import YearlyItem from './YearlyItem';

import { TransactionGroupSummaryDTO } from '@/features/transaction/types';
import { SummaryItem } from '@/features/shared/types';

interface YearlyViewProps {
  isLoading: boolean;
  data?: TransactionGroupSummaryDTO | null;
  summaryItems: SummaryItem[];
  onItemClick: (dateStr: string) => void;
}

export default function YearlyView({
  isLoading,
  data,
  summaryItems,
  onItemClick,
}: YearlyViewProps) {
  if (isLoading) {
    return (
      <p className='text-center mt-10 text-muted-foreground'>불러오는 중...</p>
    );
  }

  if (!data || !data.items.length) {
    return <EmptyMessage />;
  }

  return (
    <>
      <Panel>
        <SummaryBox items={summaryItems} />
      </Panel>

      <Panel className='bg-surface text-foreground divide-y divide-border'>
        {data.items.map((summary) => (
          <YearlyItem
            key={summary.label}
            date={summary.label}
            income={summary.groupIncome}
            expense={summary.groupExpense}
            onClick={() => onItemClick(summary.label)}
          />
        ))}
      </Panel>
    </>
  );
}
