import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { format, isThisMonth } from 'date-fns';

interface DashboardSummaryData {
  name: string;
  percent: number;
  color: string;
}

interface DashboardSummaryProps {
  totalExpense: string;
  budgetUsage: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  monthlySpending: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  categoryList: DashboardSummaryData[];
  className?: string;
  referenceDate?: Date; // 👉 optional 기준일자 추가
}

export function DashboardSummary({
  totalExpense,
  budgetUsage,
  monthlySpending,
  categoryList,
  className,
  referenceDate = new Date(), // 기본값: 오늘
}: DashboardSummaryProps) {
  const getSpendingLabel = (date: Date) =>
    isThisMonth(date)
      ? "This Month’s Spending"
      : `${format(date, 'MMMM yyyy')} Spending`; // ex: "May 2025 Spending"

  return (
    <>
      {/* Top Section: Total Expense + Two Stats */}
      <div className='flex flex-col gap-3'>
        <div className='text-3xl font-extrabold tracking-tight'>
          {totalExpense}
        </div>

        <div className='grid grid-cols-2 gap-x-4 text-sm tabular-nums'>
          <div className='space-y-1'>
            <div className='text-muted-foreground'>Budget Used</div>
            <div className='flex items-center gap-1 font-semibold'>
              {budgetUsage.value}
              {budgetUsage.delta && (
                <span
                  className={cn(
                    'text-xs',
                    budgetUsage.deltaDirection === 'up'
                      ? 'text-red-600'
                      : 'text-green-600'
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

          <div className='space-y-1 text-right'>
            <div className='text-muted-foreground'>
              {getSpendingLabel(referenceDate)}
            </div>
            <div className='flex justify-end items-center gap-1 font-semibold'>
              {monthlySpending.value}
              {monthlySpending.delta && (
                <span
                  className={cn(
                    'text-xs',
                    monthlySpending.deltaDirection === 'up'
                      ? 'text-red-600'
                      : 'text-green-600'
                  )}
                >
                  {monthlySpending.deltaDirection === 'up' ? (
                    <ArrowUp className='w-3 h-3 inline' />
                  ) : (
                    <ArrowDown className='w-3 h-3 inline' />
                  )}
                  {monthlySpending.delta}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Category + Donut */}
      <Card
        className={cn(
          'w-full @container/card gap-0 px-element py-compact bg-gray-50',
          className
        )}
      >
        <CardContent className='flex flex-col gap-component px-0 py-0'>
          {categoryList.length === 0 ? (
            <div className='py-8 text-center text-sm text-muted-foreground'>
              No category data available this month.
            </div>
          ) : (
            <div className='grid grid-cols-12 gap-4 items-center'>
              {/* Category List */}
              <div className='col-span-6 sm:col-span-6'>
                <ul className='space-y-2 text-sm'>
                  {categoryList.map((item) => (
                    <li key={item.name} className='flex items-center gap-2'>
                      <span
                        className='inline-block w-3 h-3 rounded-full'
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

              {/* Donut Chart */}
              <div className='col-span-6 sm:col-span-6 h-[130px] flex items-center justify-center'>
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
                        <Cell key={`cell-${index}`} fill={`var(${entry.color})`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
