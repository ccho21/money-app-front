import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';
import Progress from '@/components/ui/check/Progress';

interface CategoryListItemData {
  name: string;
  rate?: number; // % 사용률 (있으면 프로그레스 바 표시)
  label?: string; // % 사용률 (있으면 프로그레스 바 표시)
  budget?: number; // 예산
  remaining: number; // 예산
  amount: number; // 예산
  rangeStart?: string;
  rangeEnd?: string;
  color?: string;
  hasBudget: boolean;
  balancePayable?: number;
  outstandingBalance?: number;
  isMatched?: boolean;
  showProgress?: boolean;
}

export function BudgetListItem({
  name,
  rate,
  remaining,
  amount,
  budget,
  label,
  rangeStart,
  rangeEnd,
  hasBudget,
  onClick,
}: CategoryListItemData & {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className='px-4 py-4 border-b border-border' onClick={onClick}>
      <div className='bg-surface dark:bg-gray-800 rounded p-3 text-sm grid grid-cols-12 gap-4 items-center'>
        {hasBudget ? (
          <>
            <div className='col-span-2'>
              <div className='text-xs text-muted mb-1'>{label ?? ''}</div>
              <div className='text-md font-semibold'>
                <CurrencyDisplay amount={budget ?? 0} />
              </div>
            </div>
            <div className='col-span-10'>
              <Progress
                value={rate ?? 0}
                startDate={rangeStart}
                endDate={rangeEnd}
              />
              <div className='flex justify-between text-xs text-muted mb-1'>
                <span className='text-primary'>
                  <CurrencyDisplay amount={amount ?? 0} />
                </span>
                {/* <span>{item.rate}%</span> */}
                <span className='text-muted'>
                  <CurrencyDisplay amount={remaining ?? 0} />
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='col-span-12'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-foreground'>
                    {name}
                  </span>
                </div>
                <span>
                  <CurrencyDisplay amount={amount ?? 0} />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
