'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const data = [
  { name: '카드', value: 500000 },
  { name: '현금', value: 300000 },
  { name: '은행 계좌', value: 200000 },
];

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];
const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

export function AccountDonutChart() {
  return (
    <Card className="flat-card">
      <CardHeader className="items-center pb-tight">
        <CardTitle className="text-title text-center">
          계정별 지출 비중
        </CardTitle>
        <CardDescription className="text-caption text-muted-foreground text-center">
          총 지출: ₩{TOTAL.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flat-card-content flex justify-center items-center h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                value={`₩${TOTAL.toLocaleString()}`}
                position="center"
                className="text-body font-semibold fill-foreground"
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
