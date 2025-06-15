'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
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
import { TransactionChartCategoryResponse } from '../../types/types';

const chartConfig = {
  amount: {
    label: 'Spending',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig;

interface Props {
  data: TransactionChartCategoryResponse;
}

export function TopCategoryBarChart({ data }: Props) {
  const formatCAD = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);

  const chartData = data.topCategories.map((cat) => ({
    category: cat.name,
    amount: cat.amount,
    color: cat.color ?? 'var(--chart-1)',
  }));

  const comparison = data.comparison;
  // const insightText = comparison
  //   ? `${comparison.name} spending ${
  //       comparison.trend === 'increase' ? 'increased' : 'decreased'
  //     } by ${comparison.percentChange}`
  //   : null;

  return (
    <Card className='flat-card'>
      <CardHeader className='px-0'>
        <CardTitle className='text-body'>Top Spending Categories</CardTitle>
        <CardDescription className='text-label text-muted-foreground'>
          Spending by Category
        </CardDescription>
      </CardHeader>

      <CardContent className='flat-card-content'>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout='vertical'
            role='img'
            aria-label='Top spending categories chart'
            margin={{ top: 0, right: 60, left: 50, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='category'
              type='category'
              tick={false}
              axisLine={false}
              width={0}
            />
            <XAxis dataKey='amount' type='number' hide />
            <ChartTooltip
              content={<ChartTooltipContent indicator='line' />}
              cursor={false}
            />

            <Bar dataKey='amount' radius={4} isAnimationActive={false}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={`var(${entry.color})`} />
              ))}
              <LabelList
                dataKey='category'
                position='left'
                offset={8}
                className='text-caption fill-foreground'
              />
              <LabelList
                dataKey='amount'
                position='right'
                offset={8}
                className='text-label fill-foreground'
                formatter={formatCAD}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start px-component pb-element space-y-tight text-label'>
        <ul className='w-full divide-y divide-border'>
          {data.topCategories.map((cat) => (
            <li
              key={cat.categoryId}
              className='flex justify-between items-center py-tight'
            >
              <span className='flex items-center gap-element'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{
                    backgroundColor: cat.color
                      ? `var(${cat.color})`
                      : 'var(--chart-1)',
                  }}
                />
                {cat.name}
              </span>
              <span className='font-medium text-foreground'>
                {formatCAD(cat.amount)}
              </span>
            </li>
          ))}
        </ul>
        {comparison && (
          <p className='text-caption text-muted-foreground text-right mt-tight'>
            {comparison.name} spending{' '}
            {comparison.trend === 'increase' ? '↑' : '↓'}{' '}
            {comparison.percentChange} compared to last period
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
