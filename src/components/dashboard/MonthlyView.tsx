// 📄 src/app/dashboard/components/MonthlyView.tsx
import Panel from '@/components/ui/panel/Panel';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';

import {
  TransactionGroupSummaryDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { SummaryItem } from '@/common/types';

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
  openIndex,
  weeklySummaryByMonth,
  onToggle,
}: MonthlyViewProps) {
  if (isLoading) {
    return (
      <p className='text-center mt-section text-muted text-label'>Loading...</p>
    );
  }

  if (!data || !data.items.length) {
    return <EmptyMessage />;
  }

  return (
    <>
      {/* Monthly accordion list */}
      <Panel className='divide-y divide-border bg-surface rounded-default shadow-sm'>
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
