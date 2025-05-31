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
import { ChartDataItem } from '@/modules/insights/types/types';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

interface PatternChartsProps {
  byDay: ChartDataItem;
  byTime: ChartDataItem;
}

const config: ChartConfig = {
  amount: {
    label: 'Spending',
    color: 'var(--primary)',
  },
};

export function PatternCharts({ byDay, byTime }: PatternChartsProps) {
  const weekdayData = convertChartData(byDay.data);
  const timeRangeData = convertChartData(byTime.data);

  return (
    <div className="grid gap-component">
      {/* Spending by Day of Week */}
      <Card>
        <CardHeader>
          <CardTitle className="text-title">Spending by Day</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            From <CurrencyDisplay amount={byDay.meta?.total || 0} />
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <ChartContainer config={config} className="w-full min-w-[300px]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weekdayData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="amount"
                    radius={[4, 4, 0, 0]}
                    fill="var(--primary)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-element text-label">
          <div className="flex items-center gap-element font-medium">
            Most spent on {byDay.highlight?.key}
            <TrendingUp className="w-icon h-icon" />
          </div>
          <div className="text-caption text-muted-foreground">
            <CurrencyDisplay amount={byDay.highlight?.value || 0} /> on that day
          </div>
        </CardFooter>
      </Card>

      {/* Spending by Time of Day */}
      <Card>
        <CardHeader>
          <CardTitle className="text-title">Spending by Time of Day</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            Total: <CurrencyDisplay amount={byTime.meta?.total || 0} />
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <ChartContainer config={config} className="w-full min-w-[300px]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={timeRangeData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="amount"
                    radius={[4, 4, 0, 0]}
                    fill="var(--primary)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-element text-label">
          <div className="flex items-center gap-element font-medium">
            Peak: {byTime.highlight?.key}
            <TrendingUp className="w-icon h-icon" />
          </div>
          <div className="text-caption text-muted-foreground">
            <CurrencyDisplay amount={byTime.highlight?.value || 0} /> in that range
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function convertChartData(
  data: Record<string, number>
): { label: string; amount: number }[] {
  return Object.entries(data).map(([label, amount]) => ({ label, amount }));
}
