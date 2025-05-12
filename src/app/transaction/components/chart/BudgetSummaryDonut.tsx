'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

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
} from '@/components/ui/chart';

import { AlertTriangle } from 'lucide-react';

const totalBudget = 500000;
const totalUsed = 620000;
const percentUsed = Math.floor((totalUsed / totalBudget) * 100);
const isOver = totalUsed > totalBudget;

const chartData = [
  {
    name: 'Used',
    value: Math.min(totalUsed, totalBudget),
    fill: 'hsl(var(--chart-1))',
  },
  {
    name: 'Remaining',
    value: Math.max(totalBudget - totalUsed, 0),
    fill: 'hsl(var(--muted))',
  },
];

const formatCAD = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);

export function BudgetSummaryDonut() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Total Budget Usage</CardTitle>
        <CardDescription>
          {formatCAD(totalUsed)} / {formatCAD(totalBudget)}
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={{
            Used: { label: 'Used', color: 'hsl(var(--chart-1))' },
            Remaining: { label: 'Remaining', color: 'hsl(var(--muted))' },
          }}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey='name' />} />
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox && 'cy' in viewBox))
                      return null;
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {percentUsed}%
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col gap-2 text-sm'>
        {isOver ? (
          <div className='flex items-center gap-2 font-medium leading-none text-destructive'>
            <AlertTriangle className='h-4 w-4' />
            You&apos;ve exceeded your budget!
          </div>
        ) : (
          <div className='text-green-600 font-medium leading-none'>
            👍 You&apos;re staying within your budget
          </div>
        )}
        <div className='text-muted-foreground'>
          This is your budget usage for the current month.
        </div>
      </CardFooter>
    </Card>
  );
}
