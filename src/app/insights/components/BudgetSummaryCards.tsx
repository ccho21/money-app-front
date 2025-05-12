'use client';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, PiggyBank } from 'lucide-react';

const summary = [
  { type: 'over', category: 'Food', amount: 20000 },
  { type: 'saved', category: 'Transport', amount: 15000 },
];

const formatCAD = (amount: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);

export function BudgetSummaryCards() {
  return (
    <div className='grid gap-3'>
      {summary.map((item, index) => {
        const isOver = item.type === 'over';
        const icon = isOver ? (
          <AlertTriangle className='h-4 w-4 text-destructive' />
        ) : (
          <PiggyBank className='h-4 w-4 text-primary' />
        );

        const title = isOver
          ? `Over budget in ${item.category}`
          : `Saved money in ${item.category}`;

        const description = isOver
          ? `Exceeded by ${formatCAD(
              item.amount
            )}. Consider adjusting your budget.`
          : `Saved ${formatCAD(item.amount)}. Great job staying on track!`;

        return (
          <Alert
            key={index}
            variant={isOver ? 'destructive' : 'default'}
            className='flex items-start gap-3'
          >
            {icon}
            <div className='space-y-1'>
              <AlertTitle className='text-sm font-semibold'>{title}</AlertTitle>
              <AlertDescription className='text-sm text-muted-foreground'>
                {description}
              </AlertDescription>
            </div>
          </Alert>
        );
      })}
    </div>
  );
}
