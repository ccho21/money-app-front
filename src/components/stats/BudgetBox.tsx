// src/components/stats/BudgetBox.tsx

import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';
import Progress from '@/components/ui/progress/Progress';
import { BudgetSummaryDTO } from '@/modules/budget/types';
import { ChartBar } from 'lucide-react';

interface Props {
  item: BudgetSummaryDTO;
  handleClick?: () => void;
}

export default function BudgetBox({ item, handleClick }: Props) {
  return (
    <div className='px-component py-component' onClick={handleClick}>
      <h2 className='text-label mb-compact flex items-center gap-tight'>
        <ChartBar className='w-4 h-4' /> Budget
      </h2>

      <div className='bg-surface dark:bg-gray-800 rounded-default p-element text-label grid grid-cols-12 gap-component items-center'>
        {/* 좌측 3/12: Total Budget */}
        <div className='col-span-3'>
          <div className='text-caption text-muted mb-tight'>Total Budget</div>
          <div className='text-body font-semibold'>
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
          <div className='flex justify-between text-caption text-muted mb-tight'>
            <span className='text-primary'>
              <CurrencyDisplay amount={item.totalSpent} />
            </span>
            <span className='text-muted'>
              <CurrencyDisplay amount={item.totalBudget - item.totalSpent} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
