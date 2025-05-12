'use client';

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
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from '@/components/ui/chart';

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const weekdayData = [
  { day: 'Mon', amount: 180000 },
  { day: 'Tue', amount: 220000 },
  { day: 'Wed', amount: 210000 },
  { day: 'Thu', amount: 250000 },
  { day: 'Fri', amount: 290000 },
  { day: 'Sat', amount: 380000 },
  { day: 'Sun', amount: 340000 },
];

const timeRangeData = [
  { range: '00–06', amount: 50000 },
  { range: '06–12', amount: 120000 },
  { range: '12–18', amount: 240000 },
  { range: '18–24', amount: 300000 },
];

const config: ChartConfig = {
  amount: {
    label: 'Spending',
    color: 'hsl(var(--primary))',
  },
};

export function PatternCharts() {
  return (
    <div className='grid gap-6'>
      {/* Spending by Day of Week */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Day</CardTitle>
          <CardDescription>Based on the past 7 days</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='w-full overflow-x-auto'>
            <ChartContainer config={config} className='w-full min-w-[300px]'>
              <ResponsiveContainer width='100%' height={220}>
                <BarChart data={weekdayData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='day'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey='amount'
                    radius={[4, 4, 0, 0]}
                    fill='hsl(var(--primary))'
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Higher spending on weekends <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Saturday and Sunday account for 53% of your total spending.
          </div>
        </CardFooter>
      </Card>

      {/* Spending by Time of Day */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Time of Day</CardTitle>
          <CardDescription>Aggregated over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='w-full overflow-x-auto'>
            <ChartContainer config={config} className='w-full min-w-[300px]'>
              <ResponsiveContainer width='100%' height={220}>
                <BarChart data={timeRangeData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='range'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey='amount'
                    radius={[4, 4, 0, 0]}
                    fill='hsl(var(--primary))'
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Peak spending in the evening
            <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            The 6 PM – 12 AM range accounts for the majority of daily spending.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
