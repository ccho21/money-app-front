'use client';

import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface Props {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export function MonthlySummaryGrid({ data }: Props) {
  const formatCAD = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {data.map((item) => {
        const saved = item.income - item.expense;
        const positive = saved >= 0;
        const rate = ((saved / item.income) * 100).toFixed(1);

        return (
          <Card key={item.month} className='@container/card'>
            <CardHeader>
              <CardDescription>{item.month}</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {formatCAD(item.income)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  {positive ? (
                    <IconTrendingUp className='size-4' />
                  ) : (
                    <IconTrendingDown className='size-4' />
                  )}
                  {positive ? '+' : '-'}
                  {Math.abs(Number(rate))}%
                </Badge>
              </CardAction>
            </CardHeader>

            <CardContent className='text-sm space-y-1'>
              <div className='flex justify-between text-muted-foreground'>
                <span>Expenses</span>
                <span className='text-destructive font-medium'>
                  {formatCAD(item.expense)}
                </span>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>{positive ? 'Saved' : 'Overspent'}</span>
                <span
                  className={`font-medium ${
                    positive ? 'text-green-600' : 'text-destructive'
                  }`}
                >
                  {formatCAD(Math.abs(saved))}
                </span>
              </div>
            </CardContent>

            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex gap-2 font-medium'>
                {positive ? 'Well done – Budget saved' : 'Budget exceeded'}
                {positive ? (
                  <IconTrendingUp className='size-4 text-green-600' />
                ) : (
                  <IconTrendingDown className='size-4 text-destructive' />
                )}
              </div>
              <div className='text-muted-foreground'>
                {Math.abs(Number(rate))}% of your income was{' '}
                {positive ? 'saved' : 'overspent'} this month
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
