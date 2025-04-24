'use client';

import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';
import Progress from '@/components/ui/check/Progress';
import { BudgetSummaryDTO } from '@/modules/budget/types';

import { ChartBar } from 'lucide-react';

interface Props {
  item: BudgetSummaryDTO;
  handleClick?: () => void;
}

export default function BudgetBox({ item, handleClick }: Props) {
  return (
    <div className='px-4 py-4' onClick={handleClick}>
      <h2 className='text-sm mb-2 flex items-center gap-1'>
        <ChartBar className='w-4 h-4' /> Budget
      </h2>
      <div className='bg-surface dark:bg-gray-800 rounded p-3 text-sm grid grid-cols-12 gap-4 items-center'>
        {/* 좌측 3/12: Total Budget */}
        <div className='col-span-3'>
          <div className='text-xs text-muted mb-1'>Total Budget</div>
          <div className='text-md font-semibold'>
            <CurrencyDisplay amount={item.totalBudget} />
          </div>
        </div>

        {/* 우측 9/12: Progress bar + rate */}
        <div className='col-span-9'>
          <Progress
            value={item.rate}
            startDate={item.rangeStart}
            endDate={item.rangeEnd}
          />
          <div className='flex justify-between text-xs text-muted mb-1'>
            <span className='text-primary'>
              <CurrencyDisplay amount={item.totalSpent} />
            </span>
            {/* <span>{item.rate}%</span> */}
            <span className='text-muted'>
              <CurrencyDisplay amount={item.totalBudget - item.totalSpent} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
