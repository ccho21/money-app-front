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
import { ChartDataItem } from '@/modules/insights/types/types';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

interface BudgetUsageChartProps {
  byCategory: ChartDataItem;
}

const chartConfig: ChartConfig = {
  used: {
    label: 'Used',
    color: 'var(--chart-1)',
  },
};

export function BudgetUsageChart({ byCategory }: BudgetUsageChartProps) {
  const nameMap =
    (byCategory.meta?.names as Record<string, string> | undefined) ?? undefined;

  const chartData = convertChartData(byCategory.data, nameMap);
  const highlightId = byCategory.highlight?.key ?? null;
  const highlightName = highlightId && nameMap?.[highlightId];
  const highlightValue = byCategory.highlight?.value ?? 0;
  const total = byCategory.meta?.total ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-title'>Budget Usage by Category</CardTitle>
        <CardDescription className='text-caption text-muted-foreground'>
          Total: <CurrencyDisplay amount={total} />
        </CardDescription>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='w-full overflow-x-auto'>
          <ChartContainer config={chartConfig} className='min-w-[300px] w-full'>
            <ResponsiveContainer width='100%' height={240}>
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 12, bottom: 0, left: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='category'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey='used'
                  fill={chartConfig.used.color}
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey='used'
                    position='top'
                    style={{ fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className='flex-col items-start gap-element text-label'>
        {highlightId ? (
          <>
            <div className='flex items-center gap-element font-medium'>
              Highest spender: {highlightName ?? highlightId}
              <AlertTriangle className='w-icon h-icon text-destructive' />
            </div>
            <div className='text-caption text-muted-foreground'>
              <CurrencyDisplay amount={highlightValue} /> spent in that category
            </div>
          </>
        ) : (
          <div className='text-muted-foreground text-caption flex items-center gap-1'>
            <AlertTriangle className='w-4 h-4 text-muted' />
            <span>No overages detected</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function convertChartData(
  data: Record<string, number>,
  nameMap?: Record<string, string>
): { category: string; used: number }[] {
  return Object.entries(data).map(([id, value]) => {
    const readable =
      nameMap && id in nameMap
        ? nameMap[id]
        : /^[a-zA-Z\s]+$/.test(id)
        ? id
        : id.slice(0, 6) + '…';

    return {
      category: readable,
      used: value,
    };
  });
}
