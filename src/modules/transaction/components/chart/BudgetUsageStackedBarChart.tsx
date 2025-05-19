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

import { AlertTriangle } from 'lucide-react';
import { TransactionChartBudgetResponse } from '../../types/types';

interface Props {
  data: TransactionChartBudgetResponse;
}

export function BudgetUsageStackedBarChart({ data }: Props) {
  const chartConfig: ChartConfig = {
    used: { label: 'Used', color: 'hsl(221, 83%, 53%)' },
    over: { label: 'Over', color: 'hsl(0, 84%, 60%)' },
    remaining: { label: 'Remaining', color: 'hsl(240, 5%, 90%)' },
  };

  const transformedData = data.breakdown.map((d) => ({
    category: d.name,
    used: Math.min(d.used, d.budget),
    over: d.used > d.budget ? d.used - d.budget : 0,
    remaining: Math.max(d.budget - d.used, 0),
  }));

  const overCount = data.breakdown.filter((d) => d.over > 0).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Usage by Category</CardTitle>
        <CardDescription>
          Shows spending, overages, and remaining budget for each category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer height={260}>
            <BarChart
              data={transformedData}
              layout='vertical'
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type='number' hide />
              <YAxis
                dataKey='category'
                type='category'
                tickLine={false}
                axisLine={false}
                tick={false}
                width={0}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              {(['used', 'over', 'remaining'] as const).map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId='a'
                  fill={chartConfig[key].color}
                  radius={4}
                  layout='vertical'
                >
                  {key === 'used' && (
                    <LabelList
                      dataKey='category'
                      position='insideLeft'
                      offset={8}
                      fontSize={12}
                      className='fill-background text-sm'
                    />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        {overCount > 0 ? (
          <div className='flex items-center gap-2 font-medium text-destructive'>
            <AlertTriangle className='h-4 w-4' />
            {overCount} {overCount === 1 ? 'category is' : 'categories are'} over budget
          </div>
        ) : (
          <div className='text-green-600 font-medium'>
            👍 All categories are within budget
          </div>
        )}
        <div className='text-muted-foreground'>
          Blue: used / Red: over / Gray: remaining
        </div>
      </CardFooter>
    </Card>
  );
}
