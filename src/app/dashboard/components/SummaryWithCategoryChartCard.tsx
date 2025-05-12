import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CategoryData {
  name: string;
  percent: number;
  color: string;
}

interface SummaryWithCategoryChartCardProps {
  totalExpense: string;
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
  categoryList: CategoryData[];
  className?: string;
}

export function SummaryWithCategoryChartCard({
  totalExpense,
  budgetUsage,
  todayExpense,
  categoryList,
  className,
}: SummaryWithCategoryChartCardProps) {
  return (
    <Card
      className={cn(
        'w-full @container/card gap-0 border-none shadow-none p-0',
        className
      )}
    >
      <CardContent className='flex flex-col gap-component px-element'>
        {/* Top Summary */}
        <div className='flex flex-col gap-3'>
          <div className='text-3xl font-bold tabular-nums text-foreground'>
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
        </div>
        <Separator />
        {/* Bottom Section */}
        <div className='grid grid-cols-12 gap-4 items-center'>
          {/* Category List */}
          <div className='col-span-6 sm:col-span-6'>
            <ul className='space-y-2 text-sm'>
              {categoryList.map((item) => (
                <li key={item.name} className='flex items-center gap-2'>
                  <span
                    className='inline-block w-3 h-3 rounded-full'
                    style={{ backgroundColor: item.color }}
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
