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

const BAR_HEIGHT = 24;

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
    id: cat.categoryId,
  }));

  const chartHeight = Math.max(chartData.length * BAR_HEIGHT + 50, 100);
  const { comparison } = data;

  return (
    <Card className='flat-card'>
      <CardHeader className='px-0'>
        <CardTitle className='text-body'>Top Spending Categories</CardTitle>
        <CardDescription className='text-label text-muted-foreground'>
          Spending by Category
        </CardDescription>
      </CardHeader>

      <CardContent className='flat-card-content'>
        <ChartContainer
          config={chartConfig}
          style={{ height: chartHeight }}
          className='w-full'
        >
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            barSize={20}
            barCategoryGap={2}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='category'
              type='category'
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 5}
                  className='text-caption fill-foreground'
                  textAnchor='end'
                >
                  {payload.value}
                </text>
              )}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <XAxis
              type='number'
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator='line' />}
              cursor={false}
            />
            <Bar dataKey='amount' radius={4} isAnimationActive={false}>
              {chartData.map((entry) => (
                <Cell key={entry.id} fill={`var(${entry.color})`} />
              ))}
              <LabelList
                dataKey='amount'
                position='right'
                offset={10}
                className='text-label fill-foreground'
                formatter={formatCAD}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start px-component pb-element space-y-tight text-label'>
        <ul className='w-full divide-y divide-border'>
          {chartData.map((cat) => (
            <li
              key={cat.id}
              className='flex justify-between items-center py-tight'
            >
              <span className='flex items-center gap-element'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ backgroundColor: `var(${cat.color})` }}
                />
                {cat.category}
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
