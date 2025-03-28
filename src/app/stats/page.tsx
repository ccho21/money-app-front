'use client';

import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { CategoryListItem } from './_components/CategoryListItem';

const data = {
  expense: [
    { name: 'Social Life', value: 44.0, percent: 58, color: '#fb5c4c' },
    { name: 'Food', value: 32.48, percent: 42, color: '#fb923c' },
  ],
  income: [],
};

// ✅ Pie 강조 렌더 함수
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
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
        className='text-xs'
      >
        ${value}
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

export default function StatsPage() {
  const [tab, setTab] = useState<'income' | 'expense'>('expense');
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = data[tab];

  return (
    <div className=''>
      {/* Pie Chart */}
      <div className='w-full h-64 px-3 py-6 mb-3 bg-white'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={categories}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              dataKey='value'
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 카테고리 리스트 */}
      <div className='bg-white dark:bg-zinc-800 divide-y border-t border-gray-200'>
        {categories.map((item) => (
          <CategoryListItem
            key={item.name}
            name={item.name}
            percentage={item.percent}
            amount={item.value}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}
