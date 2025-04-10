'use client';

import { BudgetSummary } from '@/features/budget/types';
import { cn } from '@/lib/utils';

interface Props {
  item: BudgetSummary;
}

export default function BudgetBox({ item }: Props) {
  const progressColor =
    item.rate >= 100
      ? 'bg-error'
      : item.rate >= 80
      ? 'bg-warning'
      : 'bg-success';

  return (
    <div className="bg-surface p-4 border-b border-border shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          {item.categoryName}
        </span>
        <span className="text-sm text-muted">{item.rate}%</span>
      </div>

      <div className="w-full h-2 rounded-full bg-muted/20 overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300', progressColor)}
          style={{ width: `${Math.min(item.rate, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted mt-1">
        <span>${item.usedAmount.toLocaleString()}</span>
        <span>${item.budgetAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}
