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
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

import { AlertTriangle } from 'lucide-react';

const chartData = [
  { category: 'Food', used: 120000, over: 20000, remain: 0 },
  { category: 'Transport', used: 80000, over: 0, remain: 20000 },
  { category: 'Shopping', used: 60000, over: 0, remain: 0 },
];

const chartConfig: ChartConfig = {
  used: { label: 'Used', color: 'hsl(var(--chart-1))' },
  over: { label: 'Over', color: 'hsl(var(--chart-over))' },
  remain: { label: 'Remaining', color: 'hsl(var(--chart-remain))' },
};

const formatCAD = (v: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(v);

const overCount = chartData.filter((d) => d.over > 0).length;

export function BudgetUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Usage by Category</CardTitle>
        <CardDescription>Overages are highlighted in red</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width='100%' height={240}>
            <BarChart data={chartData} stackOffset='sign'>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='category'
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey='used'
                stackId='budget'
                fill={chartConfig.used.color}
              >
                <LabelList
                  dataKey='used'
                  position='top'
                  formatter={(v: number) => formatCAD(v)}
                />
              </Bar>
              <Bar
                dataKey='over'
                stackId='budget'
                fill={chartConfig.over.color}
              />
              <Bar
                dataKey='remain'
                stackId='budget'
                fill={chartConfig.remain.color}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm text-muted-foreground flex gap-2 items-center'>
        <AlertTriangle className='size-4 text-destructive' />
        {overCount === 1
          ? '1 category is over budget'
          : `${overCount} categories are over budget`}
      </CardFooter>
    </Card>
  );
}
