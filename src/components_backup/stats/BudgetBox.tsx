// 📄 src/components/stats/BudgetBox.tsx

import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import { Progress } from '@/components_backup/ui/progress';
import { BudgetSummaryDTO } from '@/modules/budget/types';
import { ChartBar } from 'lucide-react';

interface Props {
  item: BudgetSummaryDTO;
  handleClick?: () => void;
}

export default function BudgetBox({ item, handleClick }: Props) {
  return (
    <div className='space-y-tight' onClick={handleClick}>
      <h2 className='text-label font-semibold flex items-center gap-tight text-foreground'>
        <ChartBar className='w-4 h-4 text-muted-foreground' />
        Budget
      </h2>

      <div className='rounded-default bg-card p-element grid grid-cols-12 gap-tight items-center'>
        {/* 좌측: Total Budget */}
        <div className='col-span-3 space-y-tight'>
          <div className='text-caption text-muted'>Total</div>
          <div className='text-body font-semibold'>
            <CurrencyDisplay amount={item.totalBudget} />
          </div>
        </div>

        {/* 우측: Progress bar + 금액 */}
        <div className='col-span-9 space-y-tight'>
          <Progress value={item.rate} />
          <div className='flex justify-between text-label text-muted'>
            <span className='text-primary font-medium'>
              <CurrencyDisplay amount={item.totalSpent} />
            </span>
            <span className='text-muted-foreground'>
              <CurrencyDisplay amount={item.totalBudget - item.totalSpent} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
