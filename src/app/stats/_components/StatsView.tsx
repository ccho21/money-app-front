'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { useStatsStore } from '@/stores/useStatsStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { fetchStatsByCatgory } from '@/services/statsService';
import { getDateRangeKey } from '@/lib/date.util';
import { CategoryType } from '@/features/category/types';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';
import { CategoryListItem } from './CategoryListItem';

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

  const {
    state: { date, range, transactionType },
  } = useDateFilterStore();

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
          fill='white'
          textAnchor='middle'
          dominantBaseline='central'
          className='text-sm font-semibold'
        >
          {name}
        </text>
        <text
          x={x}
          y={y + 10}
          fill='white'
          textAnchor='middle'
          dominantBaseline='central'
          className='text-xs'
        >
          {`${percent.toFixed(2)}%`}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey(date, {
        unit: range,
        amount: 0,
      }).split('_');
      await fetchStatsByCatgory({
        startDate,
        endDate,
        type: transactionType as CategoryType,
      });
    };

    run();
  }, [date, transactionType, range]);

  const handleClick = (id: string) => {
    router.push(`/stats/category/${id}`);
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-400'>Loading...</p>;
  }

  if (!categoryResponse || !categoryResponse.data.length) {
    return <EmptyMessage />;
  }

  return (
    <div>
      {/* ✅ 파이 차트 영역만 개선 */}
      <Panel className='mb-2 relative'>
        <div className='w-full h-72'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryChart}
                cx='50%'
                cy='50%'
                outerRadius={100} // ✅ 더 크게
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

          {/* 중앙 텍스트 (추후 Total 표시할 수도 있음) */}
        </div>
      </Panel>

      {/* ✅ 하단 리스트는 원래 코드 그대로 유지 */}
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
