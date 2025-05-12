'use client';

import { TrendingUp } from 'lucide-react';
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

const chartData = [
  { category: 'Food', amount: 3200 },
  { category: 'Transport', amount: 1800 },
  { category: 'Shopping', amount: 1500 },
  { category: 'Other', amount: 900 },
];

const chartConfig = {
  amount: {
    label: 'Spending',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

export function TopCategoryBarChart() {
  const formatCAD = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Card>
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
            margin={{ top: 0, right: 50, left: 0, bottom: 0 }} // ✅ left 줄이기
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='category'
              type='category'
              tickLine={false}
              axisLine={false}
              tick={false}
              width={0} // 또는 60, 56 등 테스트
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
        <div className='flex gap-2 font-medium leading-none'>
          Food spending increased by 12% <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Based on the past month&apos;s spending
        </div>
      </CardFooter>
    </Card>
  );
}
