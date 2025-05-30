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

interface BudgetUsageChartProps {
  byCategory: ChartDataItem;
}

const chartConfig: ChartConfig = {
  used: { label: 'Used', color: 'hsl(var(--chart-1))' },
};

const formatCAD = (v: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(v);

export function BudgetUsageChart({ byCategory }: BudgetUsageChartProps) {
  const chartData = convertChartData(byCategory.data, byCategory.meta?.names);
  const highestName = byCategory.highlight?.key ?? null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading">
          Budget Usage by Category
        </CardTitle>
        <CardDescription className="text-caption text-muted-foreground">
          Total: {formatCAD(byCategory.meta?.total ?? 0)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tickMargin={8} // 약간 조정
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="used" fill={chartConfig.used.color}>
              <LabelList
                dataKey="used"
                position="top"
                formatter={(v: number) => formatCAD(v)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="text-caption text-muted-foreground flex gap-element items-center">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <span role="note" aria-live="polite">
          {highestName
            ? `Highest spender: ${highestName}`
            : 'No budget overages detected'}
        </span>
      </CardFooter>
    </Card>
  );
}

function convertChartData(
  data: Record<string, number>,
  nameMap?: Record<string, string>
) {
  return Object.entries(data).map(([categoryId, amount]) => ({
    category: nameMap?.[categoryId] ?? categoryId.slice(0, 6),
    used: amount,
  }));
}
