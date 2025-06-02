'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/modules/shared/lib/utils';

interface BudgetProgressBarProps {
  used: number;
  total: number;
  isOver?: boolean;
}

export default function BudgetProgressBar({
  used,
  total,
  isOver = false,
}: BudgetProgressBarProps) {
  if (total <= 0) return null;

  const percent = Math.min((used / total) * 100, 100);

  return (
    <Progress
      value={percent}
      className={cn(
        'h-2',
        isOver ? 'bg-destructive/20' : 'bg-muted',
        'overflow-hidden'
      )}
    />
  );
}
