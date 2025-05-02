// 📄 src/components/common/SummaryBox.tsx

import { SummaryItem } from '@/common/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';

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
  const columnClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] ?? 'grid-cols-3';

  return (
    <div
      className={cn(
        'grid gap-element text-label font-medium px-element py-tight',
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
            <span className='text-caption text-muted'>{item.label}</span>
            <CurrencyDisplay className={computedColor} amount={item.value} />
          </div>
        );
      })}
    </div>
  );
}
