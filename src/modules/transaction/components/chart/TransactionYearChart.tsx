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
import { PeriodData } from '../../types/types'; // dto 에 맞게 경로 조정

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--color-chart-3))',
  },
  expense: {
    label: 'Expense',
    color: 'hsl(var(--color-chart-4))',
  },
} satisfies ChartConfig;

interface Props {
  periods: PeriodData[];
}

export default function TransactionYearChart({ periods }: Props) {
  const [showAllLabels, setShowAllLabels] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);

  const maxIncome = Math.max(...periods.map((d) => d.income));
  const maxExpense = Math.max(...periods.map((d) => d.expense));

  return (
    <Card className='@container/card shadow-none'>
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
            className='aspect-auto h-[220px] w-full'
          >
            <LineChart
              data={periods}
              margin={{ top: 24, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='period' // ✅ 수정됨
                tickLine={false}
                axisLine={false}
                tickMargin={20}
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
                stroke='var(--color-chart-3)'
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
                stroke='var(--color-chart-1)'
                strokeWidth={2}
                dot
                activeDot={{ r: 5 }}
              >
                <LabelList
                  dataKey='expense'
                  position='bottom'
                  offset={5}
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
        <span className='text-xs text-primary'>
          Showing income and expense for each month
        </span>
        <div className='flex items-center gap-2'>
          <Switch
            id='label-toggle'
            checked={showAllLabels}
            onCheckedChange={setShowAllLabels}
          />
          <Label htmlFor='label-toggle' className='text-xs'>
            Show all labels
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
