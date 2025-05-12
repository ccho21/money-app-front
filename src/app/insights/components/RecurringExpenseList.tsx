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
  ChartConfig,
} from '@/components/ui/chart';

import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Sample Recurring Expense Data
const recurringChartData = [
  { name: 'Netflix', amount: 9500, fill: 'var(--chart-1)' },
  { name: 'SK Internet', amount: 33000, fill: 'var(--chart-2)' },
  { name: 'YouTube Premium', amount: 10900, fill: 'var(--chart-3)' },
  { name: 'Watcha', amount: 8900, fill: 'var(--chart-4)' },
];

const chartConfig: ChartConfig = {
  amount: { label: 'Recurring Expense' },
  Netflix: { label: 'Netflix', color: 'hsl(var(--chart-1))' },
  'SK Internet': { label: 'SK Internet', color: 'hsl(var(--chart-2))' },
  'YouTube Premium': { label: 'YouTube Premium', color: 'hsl(var(--chart-3))' },
  Watcha: { label: 'Watcha', color: 'hsl(var(--chart-4))' },
};

const formatCAD = (amount: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);

const total = recurringChartData.reduce((sum, item) => sum + item.amount, 0);

export default function RecurringExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Recurring Expenses</CardTitle>
        <CardDescription>Fixed monthly charges by amount</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={recurringChartData}
            layout='vertical'
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label ||
                value.toString()
              }
            />
            <XAxis dataKey='amount' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey='amount'
              radius={5}
              fill='hsl(var(--primary))'
              barSize={14}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Total recurring: {formatCAD(total)} /month
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Review your subscriptions to find potential savings.
        </div>
      </CardFooter>
    </Card>
  );
}
