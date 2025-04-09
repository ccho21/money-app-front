'use client';

import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: number;
  color?: string;     // 있으면 우선 사용
  prefix?: string;
  suffix?: string;
};

interface SummaryBoxProps {
  items: SummaryItem[];
  className?: string;
  columns?: number;
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
      {items.map((item, index) => {
        const computedColor = item.color
          ?? (item.value > 0
              ? 'text-blue-600 dark:text-white'        // 양수: 파란 계열 강조
              : item.value === 0
              ? 'text-gray-500'                         // 0: 중간 회색
              : 'text-[#fb5c4c]');                      // 음수: 빨간색

        return (
          <div
            key={`${item.label}-${index}`}
            className='flex flex-col items-center'
          >
            <span className='text-xs text-muted-foreground dark:text-gray-400'>
              {item.label}
            </span>
            <span className={cn(computedColor)}>
              {item.prefix ?? ''}
              {item.value.toLocaleString()}
              {item.suffix ?? ''}
            </span>
          </div>
        );
      })}
    </div>
  );
}
