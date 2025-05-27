'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';

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

import { AlertTriangle } from 'lucide-react';
import { TransactionChartBudgetResponse } from '../../types/types';

interface Props {
  data: TransactionChartBudgetResponse;
}

const chartConfig: ChartConfig = {
  used: {
    label: 'Used',
    color: 'hsl(var(--chart-1))',
  },
  over: {
    label: 'Over',
    color: 'hsl(var(--destructive))',
  },
  remaining: {
    label: 'Remaining',
    color: 'hsl(var(--muted))',
  },
};

function transformBudgetData(data: TransactionChartBudgetResponse) {
  return data.breakdown.map((item) => {
    const over = item.used > item.budget ? item.used - item.budget : 0;
    return {
      category: item.name,
      used: Math.min(item.used, item.budget),
      over,
      remaining: Math.max(item.budget - item.used, 0),
      overFlag: over > 0,
    };
  });
}

export function BudgetUsageStackedBarChart({ data }: Props) {
  const transformedData = transformBudgetData(data);
  const overCount = transformedData.filter((d) => d.overFlag).length;

  return (
    <Card className="flat-card space-y-component">
      <CardHeader className="px-component">
        <CardTitle className="text-title">
          Budget Usage by Category
        </CardTitle>
        <CardDescription className="text-caption text-muted-foreground">
          Spending, overages, and remaining budget across all categories.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-component">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={transformedData}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 40, bottom: 0 }}
            barCategoryGap={0}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="category"
              type="category"
              tick={false}
              axisLine={false}
              width={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {(['used', 'over', 'remaining'] as const).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartConfig[key].color}
                radius={1}
                barSize={30}
              >
                {key === 'used' && (
                  <LabelList
                    dataKey="category"
                    position="left"
                    offset={8}
                    fontSize={12}
                    className="text-label fill-[--color-label]"
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-tight text-label px-component pb-component">
        {overCount > 0 ? (
          <div className="flex items-center gap-element font-medium text-destructive">
            <AlertTriangle className="icon-sm" />
            {overCount} {overCount === 1 ? 'category is' : 'categories are'} over budget
          </div>
        ) : (
          <div className="text-success font-medium">
            👍 All categories are within budget
          </div>
        )}
        <div className="text-caption text-muted-foreground">
          Blue: used / Red: over / Gray: remaining
        </div>
      </CardFooter>
    </Card>
  );
}
