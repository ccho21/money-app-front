// src/components/dashboard/BudgetProgress.tsx

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BudgetProgressProps {
  totalBudget: number;
  usedAmount: number;
  className?: string;
}

export function BudgetProgress({
  totalBudget,
  usedAmount,
  className,
}: BudgetProgressProps) {
  const percentage = Math.min((usedAmount / totalBudget) * 100, 100);
  const overBudget = usedAmount > totalBudget;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>예산 사용 현황</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex justify-between text-sm text-muted-foreground'>
          <span>사용됨</span>
          <span>
            ₩{usedAmount.toLocaleString()} / ₩{totalBudget.toLocaleString()}
          </span>
        </div>
        <Progress
          value={percentage}
          className={cn(overBudget ? 'bg-red-100' : '', 'h-2 rounded-full')}
        />
        {overBudget && (
          <p className='text-xs text-red-600 mt-1'>예산을 초과했습니다!</p>
        )}
      </CardContent>
    </Card>
  );
}
