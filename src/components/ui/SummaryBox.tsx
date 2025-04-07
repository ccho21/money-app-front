'use client';

import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: number;
  color?: string;
  prefix?: string;
  suffix?: string;
};

interface SummaryBoxProps {
  items: SummaryItem[];
  className?: string;
  columns?: number; // 기본값 3, 향후 유연한 grid 지원
}

export default function SummaryBox({
  items,
  className,
  columns = 3,
}: SummaryBoxProps) {
  return (
    <div
      className={cn(
        `grid grid-cols-${columns} gap-2 text-sm font-medium px-3 border-b border-gray-200 dark:border-gray-700 py-1`,
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className='flex flex-col items-center'
        >
          <span className='text-xs text-muted-foreground dark:text-gray-400'>
            {item.label}
          </span>
          <span className={cn(item.color ?? 'text-gray-900 dark:text-white')}>
            {item.prefix ?? ''}
            {item.value.toLocaleString()}
            {item.suffix ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
}
