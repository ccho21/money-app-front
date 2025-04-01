'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

import { CategoryListItem } from './CategoryListItem';
import { fetchStatsBudgetUsage } from '@/services/statsService';
import { useStatsStore } from '@/stores/useStatsStore';

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

// 🔧 카테고리별 색상 맵핑 (실제 카테고리 ID 기준으로)
const categoryColors: Record<string, string> = {
  food: '#fb923c',
  social: '#fb5c4c',
  transport: '#60a5fa',
  shopping: '#a78bfa',
  health: '#34d399',
  etc: '#9ca3af',
};

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
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'expense';

  const [activeIndex, setActiveIndex] = useState(0);
  const {
    state: { isLoading, items },
  } = useStatsStore();

  const updated = useMemo(() => {
    return items.map((item) => ({
      name: item.categoryName,
      value: item.budgetAmount,
      percent: item.percentage,
      color: categoryColors[item.categoryId] || '#9ca3af',
    }));
  }, [items]);

  useEffect(() => {
    const fetch = async () => {
      const startDate = '2025-03-01';
      const endDate = '2025-03-31';

      await fetchStatsBudgetUsage({
        startDate,
        endDate,
        type: tab as 'income' | 'expense',
      });
    };

    fetch();
  }, [tab]);

  if (isLoading) return <p className='p-4'>Loading...</p>;

  if (!items || !items.length) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <div className='p-4'>
      {items.length > 0 && (
        <div className='w-full h-64 px-3 py-6 mb-4 bg-white dark:bg-zinc-800 rounded-xl'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={updated}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                dataKey='value'
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {items.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[1]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 카테고리 리스트 (공통) */}
      <div className='bg-white dark:bg-zinc-800 divide-y border-t border-gray-200 rounded-xl overflow-hidden'>
        {items.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.percentage}
            amount={item.budgetAmount}
            color={categoryColors[1]}
          />
        ))}
      </div>
    </div>
  );
}
