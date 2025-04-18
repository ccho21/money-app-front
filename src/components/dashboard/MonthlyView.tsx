'use client';

import SummaryBox from '@/components/stats/SummaryBox';
import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';

import {
  TransactionGroupSummaryDTO,
  TransactionGroupItemDTO,
} from '@/features/transaction/types';
import { SummaryItem } from '@/features/shared/types';

import MonthlyItem from './MonthlyItem';

interface MonthlyViewProps {
  isLoading: boolean;
  data?: TransactionGroupSummaryDTO | null;
  openIndex: number | null;
  summaryItems: SummaryItem[];
  weeklySummaryByMonth: { [key: string]: TransactionGroupItemDTO[] };
  onToggle: (index: number, summary: TransactionGroupItemDTO) => void;
}

//
// MonthlyView displays grouped monthly data and optional weekly breakdown
//
export default function MonthlyView({
  isLoading,
  data,
  summaryItems,
  openIndex,
  weeklySummaryByMonth,
  onToggle,
}: MonthlyViewProps) {
  if (isLoading) {
    return <p className='text-center mt-10 text-muted text-sm'>Loading...</p>;
  }

  if (!data || !data.items.length) {
    return <EmptyMessage />;
  }

  return (
    <>
      {/* Summary box */}
      <Panel className='p-3 border border-border bg-surface rounded mb-2'>
        <SummaryBox items={summaryItems} />
      </Panel>

      {/* Monthly accordion list */}
      <Panel className='divide-y divide-border bg-surface rounded shadow-sm'>
        {data.items.map((summary, index) => (
          <MonthlyItem
            key={summary.label}
            date={summary.label}
            income={summary.groupIncome}
            expense={summary.groupExpense}
            open={openIndex === index}
            onToggle={() => onToggle(index, summary)}
            weeklyData={
              openIndex === index
                ? weeklySummaryByMonth[summary.label] ?? []
                : []
            }
          />
        ))}
      </Panel>
    </>
  );
}
