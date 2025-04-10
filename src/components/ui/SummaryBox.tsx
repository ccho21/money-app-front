// 📄 src/components/common/SummaryBox.tsx
'use client';

import { cn } from '@/lib/utils';

type SummaryItem = {
  label: string;
  value: number;
  color?: string; // 커스텀 텍스트 색상
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
        `grid grid-cols-${columns} gap-2 text-sm font-medium px-3 py-1 border-b border-border`,
        className
      )}
    >
      {items.map((item, index) => {
        const computedColor =
          item.color ??
          (item.value > 0
            ? 'text-info'
            : item.value === 0
            ? 'text-muted'
            : 'text-error');

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex flex-col items-center"
          >
            <span className="text-xs text-muted">{item.label}</span>
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
