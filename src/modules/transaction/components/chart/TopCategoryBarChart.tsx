'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionChartCategory } from '../../hooks/queries';

const chartConfig = {
  amount: {
    label: 'Spending',
    color: 'var(--color-chart-1)',
  },
  label: {
    color: 'var(--color-background)',
  },
} satisfies ChartConfig;

export function TopCategoryBarChart() {
  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy } = query;
  const [startDate, endDate] = getDateRangeKey().split('_');
  const params = {
    timeframe: groupBy,
    startDate,
    endDate,
    groupBy: 'category' as const,
  };

  const { data, isLoading, error } = useTransactionChartCategory(params);

  const formatCAD = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);

  if (!data || isLoading) return null;

  const chartData = data.topCategories.map((cat) => ({
    category: cat.name,
    amount: cat.amount,
    color: cat.color ?? 'var(--color-chart-1)',
  }));

  const comparison = data.comparison;
  const insightText = comparison
    ? `${comparison.name} spending ${
        comparison.trend === 'increase' ? 'increased' : 'decreased'
      } by ${comparison.percentChange}`
    : null;

  return (
    <Card className='px-0 shadow-none border-none'>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
        <CardDescription>Spending by Category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='category'
              type='category'
              tickLine={false}
              axisLine={false}
              tick={false}
              width={0}
            />
            <XAxis dataKey='amount' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Bar
              dataKey='amount'
              fill='var(--color-amount)'
              radius={4}
              layout='vertical'
            >
              <LabelList
                dataKey='category'
                position='insideLeft'
                offset={8}
                className='fill-[--color-label]'
                fontSize={12}
              />
              <LabelList
                dataKey='amount'
                position='right'
                offset={8}
                className='fill-foreground'
                fontSize={12}
                formatter={formatCAD}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        {insightText && (
          <div className='flex gap-2 font-medium leading-none'>
            {insightText}{' '}
            {comparison?.trend === 'increase' ? (
              <TrendingUp className='h-4 w-4 text-red-500' />
            ) : (
              <TrendingDown className='h-4 w-4 text-green-600' />
            )}
          </div>
        )}
        <div className='leading-none text-muted-foreground'>
          Based on the past month&apos;s spending
        </div>

        <div className='w-full pt-4 space-y-1'>
          <h3 className='text-sm font-medium text-gray-800'>Top Categories</h3>
          <ul className='divide-y divide-gray-200 text-sm'>
            {data.topCategories.map((cat, idx) => (
              <li key={cat.categoryId} className='flex justify-between py-2'>
                <span className='flex items-center gap-2'>
                  <span
                    className='w-2.5 h-2.5 rounded-full'
                    style={{
                      backgroundColor: cat.color ?? 'var(--color-chart-1)',
                    }}
                  ></span>
                  {cat.name}
                </span>
                <span className='font-medium text-gray-900'>
                  {formatCAD(cat.amount)}
                </span>
              </li>
            ))}
          </ul>
          {comparison && (
            <p className='text-xs text-gray-500 text-right mt-1'>
              {comparison.name} spending{' '}
              {comparison.trend === 'increase' ? '↑' : '↓'}
              {comparison.percentChange} compared to last period
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
