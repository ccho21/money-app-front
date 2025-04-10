'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByCatgory } from '@/services/statsService';

import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';
import { CategoryListItem } from './CategoryListItem';
import type { CategoryType } from '@/features/category/types';

const RADIAN = Math.PI / 180;

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

export default function StatsView() {
  const router = useRouter();

  const {
    state: { isLoading, categoryResponse },
  } = useStatsStore();

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  const categoryChart: CategoryChartData[] = useMemo(() => {
    return (
      categoryResponse?.data.map((category) => ({
        name: category.categoryName,
        value: category.expense,
        percent: category.rate,
        color: category.color,
      })) || []
    );
  }, [categoryResponse]);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any) => {
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

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');

      await fetchStatsByCatgory({
        startDate,
        endDate,
        type: transactionType as CategoryType,
      });
    };

    run();
  }, [getDateRangeKey, transactionType, date, range]);

  const handleClick = (id: string) => {
    router.push(`/stats/category/${id}`);
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  if (!categoryResponse || !categoryResponse.data.length) {
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
        {categoryResponse.data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.expense}
            onClick={() => handleClick(item.categoryId)}
            color={item.color}
          />
        ))}
      </Panel>
    </div>
  );
}
