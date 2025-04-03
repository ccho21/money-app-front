'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

import { CategoryListItem } from './CategoryListItem';
import { useStatsStore } from '@/stores/useStatsStore';
import { fetchStatsByCatgory } from '@/services/statsService';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/dateUtils';
import { CategoryType } from '@/features/category/types';

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

// 🧠 Pie 강조 렌더 함수
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={fill}
        className='text-sm'
      >
        {payload.name}
      </text>
      <Sector
        {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }}
      />
      <Sector
        {...{
          cx,
          cy,
          startAngle,
          endAngle,
          innerRadius: outerRadius + 6,
          outerRadius: outerRadius + 10,
          fill,
        }}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
        className='text-xs'
      >
        {value.toLocaleString()}원
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
        className='text-xs'
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export default function StatsView() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
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

  if (isLoading)
    return <p className='text-center mt-10 text-gray-400'>Loading...</p>;

  if (!categoryResponse || !categoryResponse.data.length) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <div className=''>
      {categoryResponse.data.length > 0 && (
        <div className='w-full h-64 py-6 mb-4 bg-white dark:bg-zinc-800'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={categoryChart}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                dataKey='value'
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {categoryResponse.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryResponse.data[index].color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 카테고리 리스트 (공통) */}
      <div className='bg-white dark:bg-zinc-800 divide-y border-t border-gray-100 overflow-hidden'>
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
      </div>
    </div>
  );
}
