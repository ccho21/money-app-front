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
import { ChartDataItem } from '@/modules/insights/types/types';

type Props = {
  summary: ChartDataItem;
};

const formatCAD = (amount: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);

export default function RecurringExpenseChart({ summary }: Props) {
  const entries = Object.entries(summary.data);
  const total = summary.meta?.total ?? 0;

  // 💡 colorIndex → Tailwind color var 적용
  const chartData = entries.map(([name, amount], index) => ({
    name,
    amount,
    fill: `var(--chart-${(index % 8) + 1})`, // 최대 8색 반복
  }));

  const chartConfig: ChartConfig = {
    amount: { label: 'Recurring Expense' },
    ...entries.reduce((acc, [name], index) => {
      acc[name] = {
        label: name,
        color: `var(--chart-${(index % 8) + 1})`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  if (entries.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-heading'>Top Recurring Expenses</CardTitle>
        <CardDescription className='text-subheading text-muted-foreground'>
          Fixed monthly charges by amount
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ left: 5, right: 5 }}
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
              isAnimationActive={false}
              label={false}
            >
              {chartData.map((entry) => (
                <Bar
                  key={`bar-${entry.name}`}
                  dataKey='amount'
                  fill={`${entry.fill})`}
                  radius={5}
                  barSize={14}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col items-start gap-element text-body'>
        <div className='flex items-center gap-element font-medium leading-none'>
          Total recurring: {formatCAD(total)} /month
          <TrendingUp className='icon-sm text-muted-foreground' />
        </div>
        <div className='leading-none text-caption text-muted-foreground'>
          Review your subscriptions to find potential savings.
        </div>
      </CardFooter>
    </Card>
  );
}
