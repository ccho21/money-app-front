// src/app/stats/budget/_components/BudgetListItem.tsx

import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';
import Progress from '@/components/ui/progress/Progress';

interface BudgetListItemData {
  name: string;
  rate: number; // % 사용률 (있으면 프로그레스 바 표시)
  label: string; // % 사용률 (있으면 프로그레스 바 표시)
  budget: number; // 예산
  amount: number; // 예산
  rangeStart: string;
  rangeEnd: string;
  hasBudget: boolean;
}

export function BudgetListItem({
  name,
  rate,
  label,
  budget,
  amount,
  rangeStart,
  rangeEnd,
  hasBudget,
  onClick,
}: BudgetListItemData & {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className='px-element py-element border-b border-border'
      onClick={onClick}
    >
      <div className='bg-surface dark:bg-gray-800 rounded-default p-element text-label grid grid-cols-12 gap-component items-center'>
        {hasBudget ? (
          <>
            <div className='col-span-2'>
              <div className='text-caption text-muted mb-tight'>
                {label ?? ''}
              </div>
              <div className='text-body font-semibold'>
                <CurrencyDisplay amount={budget ?? 0} />
              </div>
            </div>
            <div className='col-span-10'>
              <Progress
                value={rate ?? 0}
                startDate={rangeStart}
                endDate={rangeEnd}
              />
              <div className='flex justify-between text-caption text-muted mb-tight'>
                <span className='text-primary'>
                  <CurrencyDisplay amount={amount ?? 0} />
                </span>
                <span className='text-muted'>
                  <CurrencyDisplay amount={(budget ?? 0) - (amount ?? 0)} />
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className='col-span-12'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-element'>
                <span className='text-label font-medium text-foreground'>
                  {name}
                </span>
              </div>
              <span>
                <CurrencyDisplay amount={amount ?? 0} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
