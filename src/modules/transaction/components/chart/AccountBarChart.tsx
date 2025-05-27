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

import { TrendingUp } from 'lucide-react';
import { TransactionChartAccountResponse } from '../../types/types';

const chartConfig: ChartConfig = {
  amount: {
    label: 'Spending',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
};

interface Props {
  data: TransactionChartAccountResponse;
}

const formatCAD = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);

export function AccountBarChart({ data }: Props) {
  const chartData = data.accounts.map((acc) => ({
    account: acc.name,
    amount: acc.expense,
    color: acc.color ?? 'var(--chart-1)',
  }));

  const total = data.accounts.reduce((sum, acc) => sum + acc.expense, 0);
  const top = data.accounts.reduce((prev, curr) =>
    curr.expense > prev.expense ? curr : prev
  );

  return (
    <Card className='flat-card'>
      <CardHeader className='px-0'>
        <CardTitle className='text-body'>Spending by Account</CardTitle>
        <CardDescription className='text-label text-muted-foreground'>
          Total: {formatCAD(total)}
        </CardDescription>
      </CardHeader>

      <CardContent className='flat-card-content'>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ top: 0, right: 60, left: 50, bottom: 0 }}
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
              content={<ChartTooltipContent indicator='line' />}
              cursor={false}
            />
            <Bar dataKey='amount' radius={4} isAnimationActive={false}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={`var(${entry.color})`} />
              ))}
              <LabelList
                dataKey='account'
                position='left'
                offset={8}
                className='fill-foreground text-label'
              />
              <LabelList
                dataKey='amount'
                position='right'
                offset={8}
                className='fill-foreground text-label'
                formatter={formatCAD}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-element text-label px-component pb-component'>
        <ul className='w-full divide-y divide-border'>
          {data.accounts.map((acc) => (
            <li
              key={acc.accountId}
              className='flex justify-between items-center py-tight'
            >
              <span className='flex items-center gap-element'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{
                    backgroundColor: acc.color
                      ? `var(${acc.color})`
                      : 'var(--chart-1)',
                  }}
                />
                <span className='text-body'>{acc.name}</span>
              </span>
              <span className='text-body font-medium text-foreground'>
                {formatCAD(acc.expense)}
              </span>
            </li>
          ))}
        </ul>

        <div className='flex gap-element font-medium leading-none pt-tight text-muted-foreground'>
          {top.name} had the highest spending
          <TrendingUp className='icon-sm' />
        </div>

        <p className='text-caption text-muted-foreground leading-none'>
          This chart compares account-based spending for the current period.
        </p>
      </CardFooter>
    </Card>
  );
}
