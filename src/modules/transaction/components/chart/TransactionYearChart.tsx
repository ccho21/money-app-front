'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PeriodData } from '../../types/types';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--color-chart-3)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--color-chart-4)',
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
    <Card className='@container/card flat-card'>
      <CardHeader className='relative px-0'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='text-body'>Transaction Flows</CardTitle>
            <CardDescription className='text-label text-muted-foreground'>
              Income and Expense trend by month
            </CardDescription>
          </div>

          {/* 🔥 Inline Legend */}
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1 text-caption text-muted-foreground'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: 'var(--color-chart-3)' }}
              />
              Income
            </div>
            <div className='flex items-center gap-1 text-caption text-muted-foreground'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: 'var(--color-chart-1)' }}
              />
              Expense
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flat-card-content overflow-x-auto'>
        <div className='min-w-[800px]'>
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[220px] w-full'
          >
            <LineChart
              data={periods}
              margin={{ top: 15, left: 12, right: 12, bottom: 10 }}
            >
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='period'
                tickLine={false}
                axisLine={false}
                tickMargin={20}
                minTickGap={0}
                interval='preserveStartEnd' // ← 이게 핵심
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
                  className='fill-foreground text-caption'
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
                  offset={10}
                  formatter={(value: number) =>
                    showAllLabels || value === maxExpense
                      ? formatCurrency(value)
                      : ''
                  }
                  className='fill-foreground text-caption'
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className='flex items-baseline justify-between px-0'>
        <div className='text-label mr-component'>
          Showing income and expense for each month
        </div>
        <div className='text-right shrink-0 text-primary'>
          <Label htmlFor='label-toggle' className='text-label mb-tight'>
            Show all labels
          </Label>
          <Switch
            id='label-toggle'
            checked={showAllLabels}
            onCheckedChange={setShowAllLabels}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
