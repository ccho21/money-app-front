'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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

import { TrendingUp } from 'lucide-react';

// Sample Data (EN + CAD)
const chartData = [
  { account: 'Card', amount: 500000 },
  { account: 'Cash', amount: 300000 },
  { account: 'Bank Account', amount: 200000 },
];

const chartConfig: ChartConfig = {
  amount: {
    label: 'Spending',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
};

const formatCAD = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);

const total = chartData.reduce((acc, cur) => acc + cur.amount, 0);
const top = chartData.reduce((prev, cur) =>
  cur.amount > prev.amount ? cur : prev
);

export default function AccountBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Account</CardTitle>
        <CardDescription>Total: {formatCAD(total)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer height={260}>
            <BarChart
              data={chartData}
              layout='vertical'
              margin={{ top: 0, bottom: 0, right: 50, left: 0 }} // Left flush
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey='account'
                type='category'
                tick={false}
                axisLine={false}
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
                  dataKey='account'
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
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          {top.account} had the highest spending
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          This chart compares account-based spending for the current month.
        </div>
      </CardFooter>
    </Card>
  );
}
