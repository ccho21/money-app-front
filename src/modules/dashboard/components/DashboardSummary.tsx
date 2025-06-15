'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/modules/shared/util/style.utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { format, isThisMonth } from 'date-fns';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { Separator } from '@/components/ui/separator';

interface DashboardSummaryData {
  name: string;
  percent: number;
  color: string;
}

interface DashboardSummaryProps {
  totalExpense: number;
  budgetUsage: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  monthlySpending: {
    value: number;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  categoryList: DashboardSummaryData[];
  className?: string;
  referenceDate?: Date;
}

export default function DashboardSummary({
  totalExpense,
  budgetUsage,
  monthlySpending,
  categoryList,
  className,
  referenceDate = new Date(),
}: DashboardSummaryProps) {
  const getSpendingLabel = (date: Date) =>
    isThisMonth(date)
      ? 'This Month’s Spending'
      : `${format(date, 'MMMM yyyy')} Spending`;

      console.log('### WHAT');
  return (
    <>
      <div className='flex flex-col gap-component'>
        {/* 총 지출 */}
        <div className='text-display font-extrabold tracking-tight'>
          <CurrencyDisplay
            className='text-primary'
            amount={totalExpense}
            type='total'
          />
        </div>

        {/* 예산 사용량 & 이번 달 지출 */}
        <div className='grid grid-cols-2 gap-element text-label tabular-nums'>
          <div className='space-y-tight'>
            <div className='text-muted-foreground'>Budget Used</div>
            <div className='flex items-center gap-tight font-semibold'>
              {budgetUsage.value}
              {budgetUsage.delta && (
                <span
                  className={cn(
                    'text-caption flex items-center gap-tight',
                    budgetUsage.deltaDirection === 'up'
                      ? 'text-destructive'
                      : 'text-success'
                  )}
                >
                  {budgetUsage.deltaDirection === 'up' ? (
                    <ArrowUp className='icon-sm' />
                  ) : (
                    <ArrowDown className='icon-sm' />
                  )}
                  {budgetUsage.delta}
                </span>
              )}
            </div>
          </div>

          <div className='space-y-tight text-right'>
            <div className='text-muted-foreground'>
              {getSpendingLabel(referenceDate)}
            </div>
            <div className='flex justify-end items-center gap-tight font-semibold'>
              <CurrencyDisplay amount={monthlySpending.value} type='expense' />
              {monthlySpending.delta && (
                <span
                  className={cn(
                    'text-caption flex items-center gap-tight',
                    monthlySpending.deltaDirection === 'up'
                      ? 'text-destructive'
                      : 'text-success'
                  )}
                >
                  {monthlySpending.deltaDirection === 'up' ? (
                    <ArrowUp className='icon-sm' />
                  ) : (
                    <ArrowDown className='icon-sm' />
                  )}
                  {monthlySpending.delta}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-4'></Separator>
      <Card className={cn('w-full @container/card flat-card', className)}>
        <CardContent className='flat-card-content'>
          {categoryList.length === 0 ? (
            <div className='py-spacious text-center text-caption text-muted-foreground'>
              No category data available this month.
            </div>
          ) : (
            <div className='grid grid-cols-12 gap-element items-center'>
              {/* 도넛 차트 */}
              <div className='col-span-5 h-[120px] flex items-center justify-center'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={categoryList}
                      dataKey='percent'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                    >
                      {categoryList.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`var(${entry.color})`}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 텍스트 리스트 */}
              <div className='col-span-6'>
                <ul className='space-y-tight text-label'>
                  {categoryList.map((item, i) => (
                    <li
                      key={`${item.name}-${i}`}
                      className='flex items-center gap-element'
                    >
                      <span
                        className='inline-block rounded-full w-3 h-3'
                        style={{ backgroundColor: `var(${item.color})` }}
                      />
                      <span className='font-medium text-foreground'>
                        {item.name}
                      </span>
                      <span className='ml-auto tabular-nums text-muted-foreground'>
                        {item.percent}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
