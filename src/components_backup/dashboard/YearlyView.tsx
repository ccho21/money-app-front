// 📄 src/app/dashboard/components/YearlyView.tsx

'use client';

import SummaryBox from '@/components/common/SummaryBox';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import YearlyItem from './YearlyItem';

import { TransactionGroupSummaryDTO } from '@/modules/transaction/types';
import { SummaryItem } from '@/common/types';

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
      <p className='text-center text-muted-foreground mt-section'>
        불러오는 중...
      </p>
    );
  }

  if (!data || !data.items.length) {
    return <EmptyMessage />;
  }

  return (
    <div className='space-y-component'>
      {/* Summary Box */}
      <SummaryBox items={summaryItems} />

      {/* Yearly Items */}
      <div className='bg-surface divide-y divide-border border border-border rounded-xl shadow-sm overflow-hidden'>
        {data.items.map((summary) => (
          <YearlyItem
            key={summary.label}
            date={summary.label}
            income={summary.groupIncome}
            expense={summary.groupExpense}
            onClick={() => onItemClick(summary.label)}
          />
        ))}
      </div>
    </div>
  );
}
