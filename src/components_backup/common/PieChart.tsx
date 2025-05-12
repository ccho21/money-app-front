'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components_backup/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components_backup/ui/chart';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import { TrendingUp } from 'lucide-react';

export interface CategoryChartData {
  name: string;
  value: number;
  rate: number;
  color: string;
  fill?: string;
}

interface Props {
  data: CategoryChartData[];
  height?: number;
}

const chartColorVars = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
];

export default function CategoryPieChartCard({ data, height = 320 }: Props) {
  const chartConfig = Object.fromEntries(
    data.map((item) => [
      item.name,
      {
        label: item.name,
        color: item.color,
      },
    ])
  );

  const withChartFill = (data: CategoryChartData[]): CategoryChartData[] => {
    return data.map((item, index) => ({
      ...item,
      fill: `hsl(${chartColorVars[index % chartColorVars.length]})`,
    }));
  };

  return (
    <Card className='flex flex-col border-none rounded-none shadow-none'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background'
        >
          <PieChart>
            {/* <ChartTooltip
              content={<ChartTooltipContent nameKey='name' valueKey='value' />}
            /> */}
            <Pie
              data={withChartFill(data)}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={90}
              stroke='var(--color-surface)'
              strokeWidth={2}
              isAnimationActive
              animationBegin={100}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey='name'
                className='fill-background'
                fontSize={12}
                stroke='none'
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label ?? value
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing category breakdown by value
        </div>
      </CardFooter>
    </Card>
  );
}
