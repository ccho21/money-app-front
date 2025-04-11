'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { CategoryListItem } from './CategoryListItem';

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface Props {
  isLoading: boolean;
  data: {
    categoryId: string;
    categoryName: string;
    expense: number;
    rate: number;
    color: string;
  }[];
  onItemClick: (categoryId: string) => void;
}

const RADIAN = Math.PI / 180;

export default function StatsView({ isLoading, data, onItemClick }: Props) {
  const categoryChart: CategoryChartData[] = useMemo(() => {
    return (
      data.map((category) => ({
        name: category.categoryName,
        value: category.expense,
        percent: category.rate,
        color: category.color,
      })) || []
    );
  }, [data]);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = categoryChart[index]?.name;

    return (
      <g>
        <text
          x={x}
          y={y - 10}
          className='text-[10px] font-semibold fill-foreground'
          textAnchor='middle'
          dominantBaseline='central'
        >
          {name}
        </text>
        <text
          x={x}
          y={y + 6}
          className='text-[10px] fill-muted'
          textAnchor='middle'
          dominantBaseline='central'
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <div className='bg-background min-h-screen pb-[10vh]'>
      <Panel className='mb-2 px-2 py-4'>
        <div className='w-full h-72 relative'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryChart}
                cx='50%'
                cy='50%'
                outerRadius={100}
                labelLine={false}
                label={renderCustomLabel}
                dataKey='value'
              >
                {categoryChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel>
        {data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.expense}
            onClick={() => onItemClick(item.categoryId)}
            color={item.color}
          />
        ))}
      </Panel>
    </div>
  );
}
