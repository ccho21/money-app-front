'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, LabelList } from 'recharts';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const chartData = [
  { month: 'Jan', income: 3200, expense: 2100 },
  { month: 'Feb', income: 3200, expense: 2500 },
  { month: 'Mar', income: 3200, expense: 3000 },
  { month: 'Apr', income: 3200, expense: 3000 },
  { month: 'May', income: 3200, expense: 1200 },
  { month: 'Jun', income: 3200, expense: 1000 },
  { month: 'Jul', income: 3200, expense: 1700 },
  { month: 'Aug', income: 3200, expense: 1400 },
  { month: 'Sep', income: 3200, expense: 1600 },
  { month: 'Oct', income: 3200, expense: 750 },
  { month: 'Nov', income: 3200, expense: 2400 },
  { month: 'Dec', income: 3200, expense: 3200 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-2))',
  },
  expense: {
    label: 'Expense',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function TransactionYearChart() {
  const [showAllLabels, setShowAllLabels] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);

  const maxIncome = Math.max(...chartData.map((d) => d.income));
  const maxExpense = Math.max(...chartData.map((d) => d.expense));

  return (
    <Card className='@container/card'>
      <CardHeader className='relative'>
        <CardTitle>Yearly Overview</CardTitle>
        <CardDescription>
          <span className='@[540px]/card:block hidden'>
            Income and Expense trend by month
          </span>
          <span className='@[540px]/card:hidden'>Annual summary</span>
        </CardDescription>
      </CardHeader>

      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 overflow-x-auto'>
        <div className='min-w-[800px]'>
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[250px] w-full'
          >
            <LineChart
              data={chartData}
              margin={{ top: 24, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator='line'
                    labelFormatter={(value) => value}
                  />
                }
              />
              <Line
                dataKey='income'
                type='monotone'
                stroke='#22c55e' // 🔥 정확히 여기
                strokeWidth={2}
                dot
                activeDot={{ r: 5 }}
              >
                <LabelList
                  dataKey='income'
                  position='top'
                  offset={10}
                  formatter={(value: number) =>
                    showAllLabels || value === maxIncome
                      ? formatCurrency(value)
                      : ''
                  }
                  className='fill-foreground text-xs'
                />
              </Line>
              <Line
                dataKey='expense'
                type='monotone'
                stroke='#ef4444' // 🔥 여기도
                strokeWidth={2}
                dot
                activeDot={{ r: 5 }}
              >
                <LabelList
                  dataKey='expense'
                  position='bottom'
                  offset={10}
                  formatter={(value: number) =>
                    showAllLabels || value === maxExpense
                      ? formatCurrency(value)
                      : ''
                  }
                  className='fill-foreground text-xs'
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className='flex items-center justify-between px-4 pt-2'>
        <span className='text-sm text-muted-foreground'>
          Showing income and expense for each month
        </span>
        <div className='flex items-center gap-2'>
          <Switch
            id='label-toggle'
            checked={showAllLabels}
            onCheckedChange={setShowAllLabels}
          />
          <Label htmlFor='label-toggle' className='text-sm'>
            Show all labels
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
