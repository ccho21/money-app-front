'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { Progress } from '@/components/ui/Progress';

interface CategoryListItemProps {
  name: string;
  amount: number;
  percentage?: number;
  color?: string;
  className?: string;
  isMatched?: boolean;
  onClick: () => void;
  variant?: 'default' | 'with-progress-a' | 'with-progress-b';
  outstandingBalance?: number;
  balancePayable?: number;
}

export function CategoryListItem({
  name,
  amount,
  percentage,
  color = '#ccc',
  className,
  isMatched = true,
  onClick,
  variant = 'default',
  outstandingBalance,
  balancePayable,
}: CategoryListItemProps) {
  const showPercentage = percentage !== undefined;
  const isProgressA = variant === 'with-progress-a';
  const isProgressB = variant === 'with-progress-b';

  const hasCardInfo =
    outstandingBalance !== undefined || balancePayable !== undefined;

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-3 py-3 border-b space-y-1',
        'bg-surface',
        isMatched
          ? 'border-border'
          : 'border-error bg-red-50 dark:bg-red-950',
        className
      )}
    >
      {variant === 'default' && (
        <div className='flex items-center justify-between'>
          {/* 좌측 색상 + 이름 */}
          <div className='flex items-center gap-3'>
            {showPercentage && (
              <div
                className='text-xs font-semibold text-white px-2 py-0.5 rounded-full'
                style={{ backgroundColor: color }}
              >
                {formatCurrency(percentage)}%
              </div>
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isMatched ? 'text-foreground' : 'text-error'
              )}
            >
              {name}
            </span>
          </div>

          {/* 금액 */}
          <div
            className={cn(
              'text-sm font-semibold',
              isMatched ? 'text-muted-foreground' : 'text-error'
            )}
          >
            {formatCurrency(amount)}
          </div>
        </div>
      )}

      {isProgressA && (
        <>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='w-2 h-6 rounded-sm'
                style={{ backgroundColor: color }}
              />
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-foreground'>
                  {name}
                </span>
                <span className='text-xs text-muted'>
                  {formatCurrency(percentage as number)}% used
                </span>
              </div>
            </div>
            <div className='text-sm font-semibold text-muted-foreground'>
              {formatCurrency(amount)}
            </div>
          </div>
          <Progress value={percentage as number} className='mt-2' />
        </>
      )}

      {isProgressB && (
        <>
          <div className='flex justify-between items-center mb-1'>
            <div className='flex items-center gap-2'>
              <div
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: color }}
              />
              <span className='text-base font-semibold text-foreground'>
                {name}
              </span>
            </div>
            <span className='text-sm text-muted font-medium'>
              {percentage}% • {formatCurrency(amount)}
            </span>
          </div>
          <Progress value={percentage as number} className='h-2 rounded-full' />
        </>
      )}

      {/* ✅ 카드 정보 (outstandingBalance / balancePayable) 표시 */}
      {hasCardInfo && (
        <div className='mt-2 space-y-1 text-xs text-muted'>
          {balancePayable !== undefined && (
            <div className='flex justify-between'>
              <span>Balance Payable</span>
              <span>{formatCurrency(balancePayable)}</span>
            </div>
          )}
          {outstandingBalance !== undefined && (
            <div className='flex justify-between'>
              <span>Outstanding Balance</span>
              <span>{formatCurrency(outstandingBalance)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
