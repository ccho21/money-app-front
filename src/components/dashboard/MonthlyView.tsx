'use client';

import SummaryBox from '@/components/stats/SummaryBox';
import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';

import {
  TransactionSummaryResponse,
  TransactionSummary,
} from '@/features/transaction/types';
import MonthlyItem from './MonthlyItem';
import { SummaryItem } from '@/features/shared/types';

interface MonthlyViewProps {
  isLoading: boolean;
  data?: TransactionSummaryResponse | null;
  openIndex: number | null;
  summaryItems: SummaryItem[];
  weeklySummaryByMonth: { [key: string]: TransactionSummary[] };
  onToggle: (index: number, summary: TransactionSummary) => void;
}

export default function MonthlyView({
  isLoading,
  data,
  summaryItems,
  openIndex,
  weeklySummaryByMonth,
  onToggle,
}: MonthlyViewProps) {
  if (isLoading) {
    return (
      <p className='text-center mt-10 text-muted text-sm'>불러오는 중...</p>
    );
  }

  if (!data || !data.data.length) {
    return <EmptyMessage />;
  }

  console.log('### weeklySummaryByMonth', weeklySummaryByMonth);

  return (
    <>
      {/* 요약 박스 */}
      <Panel className='p-3 border border-border bg-surface rounded mb-2'>
        <SummaryBox items={summaryItems} />
      </Panel>

      {/* 월별 아코디언 리스트 */}
      <Panel className='divide-y divide-border bg-surface rounded shadow-sm'>
        {data.data.map((summary, index) => (
          <MonthlyItem
            key={summary.label}
            date={summary.label}
            income={summary.incomeTotal}
            expense={summary.expenseTotal}
            open={openIndex === index}
            onToggle={() => onToggle(index, summary)}
            weeklyData={
              openIndex === index && weeklySummaryByMonth[summary.label]
                ? weeklySummaryByMonth[summary.label]
                : []
            }
          />
        ))}
      </Panel>
    </>
  );
}
