// 📄 src/components/common/SummaryBox.tsx
'use client';

import { SummaryItem } from '@/shared/types';
import { cn } from '@/lib/utils';

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
  // ✅ Tailwind 인식 가능한 정적 class 매핑
  const columnClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] ?? 'grid-cols-3'; // fallback

  return (
    <div
      className={cn(
        'grid gap-2 text-sm font-medium px-3 py-1',
        columnClass,
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
            className='flex flex-col items-center'
          >
            <span className='text-xs text-muted'>{item.label}</span>
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
