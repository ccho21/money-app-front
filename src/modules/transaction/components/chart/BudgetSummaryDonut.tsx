import { PieChart, Pie, Cell, Label } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TransactionChartBudgetResponse } from '../../types/types';

interface Props {
  data: TransactionChartBudgetResponse;
}

const formatCAD = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);

export function BudgetSummaryDonut({ data }: Props) {
  const { totalBudget, totalUsed, usageRate } = data;

  const chartData = [
    {
      name: 'Used',
      value: Math.min(totalUsed, totalBudget),
      fill: 'var(--chart-2)',
    },
    {
      name: 'Remaining',
      value: Math.max(totalBudget - totalUsed, 0),
      fill: 'var(--muted)',
    },
  ];

  return (
    <Card className="flat-card">
      <CardHeader className="items-center px-component">
        <CardTitle className="text-title">Total Budget Usage</CardTitle>
        <CardDescription className="text-caption">
          {formatCAD(totalUsed)} / {formatCAD(totalBudget)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flat-card-content">
        <ChartContainer
          config={{
            Used: { label: 'Used', color: 'var(--chart-1)' },
            Remaining: { label: 'Remaining', color: 'var(--muted)' },
          }}
          className="mx-auto"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              strokeWidth={5}
              animationDuration={500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox && 'cy' in viewBox)) return null;
                  const { cx, cy } = viewBox;
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground"
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className="text-display font-bold"
                      >
                        {usageRate}%
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
