// src/components/chart/AccountDonutChart.tsx
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
import { ChartContainer } from './ChartContainer';

const data = [
  { name: '카드', value: 500000 },
  { name: '현금', value: 300000 },
  { name: '은행 계좌', value: 200000 },
];

const COLORS = ['#60a5fa', '#a78bfa', '#f87171'];
const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

export function AccountDonutChart() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>계정별 지출 비중</CardTitle>
        <CardDescription>총 지출: ₩{TOTAL.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <ChartContainer>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
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
                  position='center'
                  className='text-lg font-bold fill-foreground'
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
