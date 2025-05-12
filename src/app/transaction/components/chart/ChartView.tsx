// 📄 src/components/transaction/ChartView.tsx

import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Card, CardContent } from '@/components_backup/ui/card';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import { ChevronRight } from 'lucide-react';

import type { TransactionGroupSummaryDTO } from '@/modules/transaction/types';
import LoadingMessage from '@/components/ui/custom/loadingMessage';

interface ChartViewProps {
  isLoading: boolean;
  data?: TransactionGroupSummaryDTO | null;
  onMonthClick?: (label: string) => void;
}

export default function ChartView({
  isLoading,
  data,
  onMonthClick,
}: ChartViewProps) {
  if (isLoading) return <LoadingMessage />;
  if (!data || !data.items.length) return <EmptyMessage />;

  return (
    <>
      {data.items.map((summary) => {
        const { label, groupIncome, groupExpense } = summary;
        const parsedDate = new Date(`${label}`);
        const monthLabel = format(parsedDate, 'yyyy MMM');
        const rangeStart = format(startOfMonth(parsedDate), 'MM-dd');
        const rangeEnd = format(endOfMonth(parsedDate), 'MM-dd');
        const total = groupIncome - groupExpense;

        return (
          <Card
            key={label}
            className='cursor-pointer hover:bg-muted transition-colors py-compact mb-compact'
            onClick={() => onMonthClick?.(label)}
          >
            <CardContent className='px-component flex justify-between items-center'>
              {/* 좌측: 라벨 */}
              <div className='flex flex-col text-left'>
                <span className='text-label font-semibold text-foreground'>
                  {monthLabel}
                </span>
                <span className='text-caption text-muted-foreground'>
                  {rangeStart} ~ {rangeEnd}
                </span>
              </div>

              {/* 우측: 금액 + 화살표 */}
              <div className='flex items-center gap-tight'>
                <div className='flex flex-col items-end text-right gap-tight'>
                  <div className='flex gap-element'>
                    <CurrencyDisplay amount={groupIncome ?? 0} type='income' />
                    <CurrencyDisplay
                      amount={groupExpense ?? 0}
                      type='expense'
                    />
                  </div>
                  <div className='text-caption'>
                    Total <CurrencyDisplay amount={total ?? 0} type='total' />
                  </div>
                </div>
                <ChevronRight className='w-3 h-3 text-muted-foreground ml-1' />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
