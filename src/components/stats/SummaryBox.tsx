'use client';

import { SummaryItem } from '@/common/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import { ChevronRightIcon } from 'lucide-react';

interface SummaryBoxProps {
  items: SummaryItem[];
  className?: string;
  columns?: number;
  variant?: 'flat' | 'toss';
  onClick?: () => void;
}

export default function SummaryBox({
  items,
  className,
  columns = 3,
  variant = 'flat',
  onClick,
}: SummaryBoxProps) {
  const columnClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] ?? 'grid-cols-3';

  if (variant === 'toss' && items.length >= 1) {
    const [main, income, expense] = items;

    const mainColor =
      main.color ??
      (main.value > 0
        ? 'text-success'
        : main.value === 0
        ? 'text-muted'
        : 'text-error');

    const incomeColor = income?.color ?? 'text-success';
    const expenseColor = expense?.color ?? 'text-error';

    return (
      <div
        className={cn(
          'flex items-center justify-between px-component py-component bg-surface rounded-card shadow-sm',
          onClick && 'cursor-pointer hover:bg-muted/5 transition-colors',
          className
        )}
        onClick={onClick}
      >
        <div className='flex flex-col'>
          <div className='text-label font-medium text-foreground mb-tight'>
            {main.label}
          </div>

          <div className={cn('text-2xl font-bold', mainColor)}>
            <CurrencyDisplay amount={main.value} />
          </div>

          {/* Income / Expense Inline 표시 */}
          <div className='text-caption mt-tight flex gap-4'>
            {income && (
              <span className={cn(incomeColor)}>
                {income.label} <CurrencyDisplay amount={income.value} />
              </span>
            )}
            {expense && (
              <span className={cn(expenseColor)}>
                {expense.label} <CurrencyDisplay amount={expense.value} />
              </span>
            )}
          </div>
        </div>

        <ChevronRightIcon className='h-5 w-5 text-muted' />
      </div>
    );
  }

  // flat variant
  return (
    <div
      className={cn(
        'grid w-full gap-component px-component py-element bg-surface rounded-card',
        columnClass,
        className
      )}
    >
      {items.map((item, index) => {
        const computedColor =
          item.color ??
          (item.value > 0
            ? 'text-success'
            : item.value === 0
            ? 'text-muted'
            : 'text-error');

        return (
          <div
            key={`${item.label}-${index}`}
            className='flex flex-col items-center text-center'
          >
            <CurrencyDisplay
              amount={item.value}
              className={cn('text-heading font-bold', computedColor)}
            />
            <span className='mt-tight text-caption text-muted'>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
