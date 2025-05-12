import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TotalExpenseCardProps {
  totalExpense: string; // formatted as $x,xxx.xx
  budgetUsage: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  todayExpense: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  className?: string;
}

export function TotalExpenseCard({
  totalExpense,
  budgetUsage,
  todayExpense,
  className,
}: TotalExpenseCardProps) {
  return (
    <Card className={cn('w-full gap-0', className)}>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-muted-foreground'>
          Total Spending This Month
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='text-3xl font-bold tabular-nums text-foreground'>
          {totalExpense}
        </div>

        <div className='grid grid-cols-2 text-sm tabular-nums'>
          {/* Budget Usage */}
          <div className='space-y-1'>
            <div className='text-muted-foreground'>Budget Used</div>
            <div className='flex items-center gap-1 font-semibold'>
              {budgetUsage.value}
              {budgetUsage.delta && (
                <span
                  className={cn(
                    'text-xs',
                    budgetUsage.deltaDirection === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {budgetUsage.deltaDirection === 'up' ? (
                    <ArrowUp className='w-3 h-3 inline' />
                  ) : (
                    <ArrowDown className='w-3 h-3 inline' />
                  )}
                  {budgetUsage.delta}
                </span>
              )}
            </div>
          </div>

          {/* Today’s Spending */}
          <div className='space-y-1 text-right'>
            <div className='text-muted-foreground'>Today’s Spending</div>
            <div className='flex justify-end items-center gap-1 font-semibold'>
              {todayExpense.value}
              {todayExpense.delta && (
                <span
                  className={cn(
                    'text-xs',
                    todayExpense.deltaDirection === 'up'
                      ? 'text-red-600'
                      : 'text-green-600'
                  )}
                >
                  {todayExpense.deltaDirection === 'up' ? (
                    <ArrowUp className='w-3 h-3 inline' />
                  ) : (
                    <ArrowDown className='w-3 h-3 inline' />
                  )}
                  {todayExpense.delta}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
