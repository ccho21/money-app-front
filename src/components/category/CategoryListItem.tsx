// src/components/category/CategoryListItem.tsx
'use client';

import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';
import Progress from '@/components/ui/progress/Progress';
import { cn } from '@/lib/utils';

interface CategoryListItemData {
  name: string;
  amount?: number;
  rate?: number;
  budget?: number;
  startDate?: string;
  endDate?: string;
  color?: string;
  hasBudget?: boolean;
  balancePayable?: number;
  outstandingBalance?: number;
  isMatched?: boolean;
  showProgress?: boolean;
}

export function CategoryListItem({
  name,
  rate,
  amount,
  budget,
  startDate,
  endDate,
  color = '#ccc',
  balancePayable,
  outstandingBalance,
  isMatched = true,
  onClick,
  className,
  showProgress = true,
}: CategoryListItemData & {
  onClick: () => void;
  className?: string;
}) {
  const showCardInfo =
    balancePayable !== undefined || outstandingBalance !== undefined;

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-element py-element border-b space-y-element bg-surface',
        isMatched ? 'border-border' : 'border-error bg-red-50 dark:bg-red-950',
        className
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-tight'>
          {color && (
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: color }}
            />
          )}
          <span className='text-label font-medium text-foreground'>
            {name}
          </span>
        </div>
        <span>
          <CurrencyDisplay amount={amount ?? 0} />
        </span>
      </div>

      {showProgress && (
        <>
          <Progress value={rate!} startDate={startDate} endDate={endDate} />
          <div className='flex justify-between text-caption text-muted mt-tight'>
            <span className='text-primary'>
              <CurrencyDisplay amount={budget ?? 0} />
            </span>
            <span>
              <CurrencyDisplay amount={(budget ?? 0) - (amount ?? 0)} />
            </span>
          </div>
        </>
      )}

      {showCardInfo && (
        <div className='space-y-tight text-caption text-muted mt-compact'>
          {balancePayable !== undefined && (
            <div className='flex justify-between'>
              <span>Balance Payable</span>
              <span>
                <CurrencyDisplay amount={balancePayable} />
              </span>
            </div>
          )}
          {outstandingBalance !== undefined && (
            <div className='flex justify-between'>
              <span>Outstanding Balance</span>
              <span>
                <CurrencyDisplay amount={outstandingBalance} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
