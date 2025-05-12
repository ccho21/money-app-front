'use client';

import { TrendingUp } from 'lucide-react';
import { PieChart, Pie, LabelList } from 'recharts';

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
  { category: 'Food', value: 350000, fill: 'var(--color-category-1)' },
  { category: 'Transport', value: 220000, fill: 'var(--color-category-2)' },
  { category: 'Shopping', value: 180000, fill: 'var(--color-category-3)' },
  { category: 'Other', value: 95000, fill: 'var(--color-category-4)' },
];

const chartConfig = {
  value: {
    label: 'Spending',
  },
  Food: {
    label: 'Food',
    color: 'hsl(var(--chart-1))',
  },
  Transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-2))',
  },
  Shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-3))',
  },
  Other: {
    label: 'Other',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function CategoryPieChart() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Based on the past month</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background'
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey='category' hideLabel />}
            />
            <Pie data={chartData} dataKey='value'>
              <LabelList
                dataKey='category'
                className='fill-background'
                stroke='none'
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Food accounts for the largest share (42%){' '}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Distribution of your expenses over the past month
        </div>
      </CardFooter>
    </Card>
  );
}
