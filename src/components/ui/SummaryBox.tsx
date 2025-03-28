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
}

export default function SummaryBox({ items, className }: SummaryBoxProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-2 text-sm font-medium px-3 pb-2 border-b border-gray-200',
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className='flex flex-col items-center'>
          <span className='text-xs text-muted-foreground'>{item.label}</span>
          <span className={item.color ?? 'text-gray-900 dark:text-white'}>
            {item.prefix ?? ''}
            {item.value.toLocaleString()}
            {item.suffix ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
}
