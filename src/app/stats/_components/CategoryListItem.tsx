'use client';

import { cn } from '@/lib/utils';

interface CategoryListItemProps {
  name: string;
  amount: number;
  percentage?: number;
  color?: string;
  className?: string;
}

export function CategoryListItem({
  name,
  amount,
  percentage,
  color = '#ccc',
  className,
}: CategoryListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700',
        className
      )}
    >
      {/* 좌측 색상 원 + 이름 */}
      <div className='flex items-center gap-3'>
        {percentage !== undefined && (
          <div
            className='text-xs font-semibold text-white px-2 py-0.5 rounded-full'
            style={{ backgroundColor: color }}
          >
            {percentage}%
          </div>
        )}
        <span className='text-sm font-medium text-gray-800 dark:text-white'>
          {name}
        </span>
      </div>

      {/* 금액 */}
      <div className='text-sm font-semibold text-gray-700 dark:text-gray-100'>
        ${amount.toFixed(2)}
      </div>
    </div>
  );
}
