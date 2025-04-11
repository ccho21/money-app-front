'use client';

import Progress from '@/components/ui/Progress';
import { BudgetSummaryResponse } from '@/features/budget/types';
import { formatCurrency } from '@/lib/utils';
import { ChartBar } from 'lucide-react';

interface Props {
  item: BudgetSummaryResponse;
  handleClick?: () => void;
}

export default function BudgetBox({ item, handleClick }: Props) {
  const progressColor =
    item.rate >= 100
      ? 'bg-error'
      : item.rate >= 80
      ? 'bg-warning'
      : 'bg-success';

  return (
    <div className='px-4 py-4' onClick={handleClick}>
      <h2 className='text-sm mb-2 flex items-center gap-1'>
        <ChartBar className='w-4 h-4' /> Budget
      </h2>
      <div className='bg-gray-800 rounded p-3 text-sm grid grid-cols-12 gap-4 items-center'>
        {/* 좌측 3/12: Total Budget */}
        <div className='col-span-3'>
          <div className='text-xs text-gray-400 mb-1'>Total Budget</div>
          <div className='text-base font-semibold'>
            {formatCurrency(item.totalBudget)}
          </div>
        </div>

        {/* 우측 9/12: Progress bar + rate */}
        <div className='col-span-9'>
          <Progress
            value={item.rate}
            startDate={item.rangeStart}
            endDate={item.rangeEnd}
          />
          <div className='flex justify-between text-xs text-gray-300 mb-1'>
            <span className='text-blue-400'>
              {formatCurrency(item.totalExpense)}
            </span>
            <span>{item.rate}%</span>
            <span className='text-gray-400'>
              {formatCurrency(item.totalBudget - item.totalExpense)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
