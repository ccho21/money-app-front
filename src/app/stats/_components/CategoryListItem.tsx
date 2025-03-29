'use client';

import { cn, formatCurrency } from '@/lib/utils';

interface CategoryListItemProps {
  name: string;
  amount: number;
  percentage?: number;
  color?: string;
  className?: string;
  isMatched?: boolean; // ✅ 잔고 정합성 여부
}

export function CategoryListItem({
  name,
  amount,
  percentage,
  color = '#ccc',
  className,
  isMatched = true,
}: CategoryListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b',
        'bg-white dark:bg-zinc-900',
        isMatched
          ? 'border-gray-200 dark:border-zinc-700'
          : 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950',
        className
      )}
    >
      {/* 좌측 색상 + 이름 */}
      <div className='flex items-center gap-3'>
        {percentage !== undefined && (
          <div
            className='text-xs font-semibold text-white px-2 py-0.5 rounded-full'
            style={{ backgroundColor: color }}
          >
            {percentage}%
          </div>
        )}
        <span
          className={cn(
            'text-sm font-medium',
            isMatched ? 'text-gray-800 dark:text-white' : 'text-red-600 dark:text-red-400'
          )}
        >
          {name}
        </span>
      </div>

      {/* 금액 */}
      <div
        className={cn(
          'text-sm font-semibold',
          isMatched ? 'text-gray-700 dark:text-gray-100' : 'text-red-600 dark:text-red-400'
        )}
      >
        {formatCurrency(amount)}
      </div>
    </div>
  );
}
