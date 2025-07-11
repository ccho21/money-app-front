'use client';

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

import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TransactionChartBudgetResponse } from '../../types/types';

interface Props {
  data: TransactionChartBudgetResponse;
}

const CSS_VAR_KEYS = {
  used: '--chart-1',
  over: '--destructive',
  remaining: '--muted',
};

function resolveCssVar(cssVar: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
}

function transformBudgetData(data: TransactionChartBudgetResponse) {
  return data.breakdown.map((item) => {
    const over = item.used > item.budget ? item.used - item.budget : 0;
    return {
      category: item.name,
      used: Math.min(item.used, item.budget),
      over,
      remaining: Math.max(item.budget - item.used, 0),
      overFlag: over > 0,
    };
  });
}

export function BudgetUsageStackedBarChart({ data }: Props) {
  const transformedData = transformBudgetData(data);
  const overCount = transformedData.filter((d) => d.overFlag).length;

  const [resolvedColors, setResolvedColors] = useState({
    used: '#999',
    over: '#f00',
    remaining: '#ccc',
  });

  useEffect(() => {
    setResolvedColors({
      used: resolveCssVar(CSS_VAR_KEYS.used),
      over: resolveCssVar(CSS_VAR_KEYS.over),
      remaining: resolveCssVar(CSS_VAR_KEYS.remaining),
    });
  }, []);

  const chartConfig: ChartConfig = {
    used: {
      label: 'Used',
      color: resolvedColors.used,
    },
    over: {
      label: 'Over',
      color: resolvedColors.over,
    },
    remaining: {
      label: 'Remaining',
      color: resolvedColors.remaining,
    },
  };

  const chartHeight = transformedData.length * 24 + 50;

  return (
    <Card className='flat-card space-y-component gap-component'>
      <CardHeader className='px-component mb-0'>
        <CardTitle className='text-title'>Budget Usage by Category</CardTitle>
        <CardDescription className='text-caption text-muted-foreground'>
          Spending, overages, and remaining budget across all categories.
        </CardDescription>
      </CardHeader>

      <CardContent className='px-component'>
        <ChartContainer
          config={chartConfig}
          style={{ height: chartHeight }}
          className='w-full'
        >
          <BarChart
            data={transformedData}
            layout='vertical'
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            barCategoryGap={0}
          >
            <CartesianGrid horizontal={false} strokeDasharray='3 3' />
            <XAxis
              type='number'
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              dataKey='category'
              type='category'
              tick={false}
              axisLine={false}
              width={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            {Object.entries(chartConfig).map(([key, { color }], idx, arr) => {
              const isFirst = idx === 0;
              const isLast = idx === arr.length - 1;

              const radius: [number, number, number, number] = isFirst
                ? [4, 0, 0, 4]
                : isLast
                ? [0, 4, 4, 0]
                : [0, 4, 4, 0];

              return (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId='a'
                  fill={color}
                  radius={radius}
                  barSize={20}
                >
                  {key === 'used' && (
                    <LabelList
                      dataKey='category'
                      position='left'
                      offset={8}
                      fontSize={12}
                      style={{ fill: 'var(--color-label)' }}
                    />
                  )}
                </Bar>
              );
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-tight text-heading px-component pb-component'>
        {overCount > 0 ? (
          <div className='flex items-center gap-element font-medium text-destructive'>
            <AlertTriangle className='icon-sm' />
            {overCount} {overCount === 1 ? 'category is' : 'categories are'}{' '}
            over budget
          </div>
        ) : (
          <div className='text-primary font-medium'>
            👍 All categories are within budget
          </div>
        )}
        <div className='text-subheading text-muted-foreground'>
          Blue: used / Red: over / Gray: remaining
        </div>
      </CardFooter>
    </Card>
  );
}
