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
    color: 'var(--chart-1)',
  },
  label: {
    color: 'var(--background)',
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

const BAR_HEIGHT = 28;

export function AccountBarChart({ data }: Props) {
  const chartData = data.accounts.map((acc) => ({
    account: acc.name,
    amount: acc.expense,
    color: acc.color ?? 'var(--chart-1)',
    id: acc.accountId,
  }));

  const chartHeight = (chartData.length * BAR_HEIGHT) + 50;

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
        <ChartContainer config={chartConfig} style={{ height: chartHeight }}>
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ top: 0, right: 60, left: 30, bottom: 0 }}
            barSize={20}
            barCategoryGap={2}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='account'
              type='category'
              axisLine={false}
              tick={false}
              width={40}
            />
            <XAxis type='number' hide />
            <ChartTooltip
              content={<ChartTooltipContent indicator='line' />}
              cursor={false}
            />
            <Bar dataKey='amount' radius={4} isAnimationActive={false}>
              {chartData.map((entry) => (
                <Cell key={entry.id} fill={`var(${entry.color})`} />
              ))}
              <LabelList
                dataKey='account'
                position='left'
                offset={8}
                className='text-caption fill-foreground'
              />
              <LabelList
                dataKey='amount'
                position='right'
                offset={8}
                className='fill-foreground text-caption'
                formatter={formatCAD}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-element text-label px-component pb-component'>
        <ul className='w-full divide-y divide-border'>
          {chartData.map((acc) => (
            <li
              key={acc.id}
              className='flex justify-between items-center py-tight'
            >
              <span className='flex items-center gap-element'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ backgroundColor: `var(${acc.color})` }}
                />
                <span className='text-body'>{acc.account}</span>
              </span>
              <span className='text-body font-medium text-foreground'>
                {formatCAD(acc.amount)}
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
