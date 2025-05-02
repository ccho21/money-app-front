// src/components/common/PieChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;

export interface CategoryChartData {
  name: string;
  value: number;
  rate: number;
  color: string;
}

interface Props {
  data: CategoryChartData[];
  height?: number;
}

export default function CategoryPieChart({ data, height = 320 }: Props) {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    rate,
    index,
  }: any) => {
    const lineRadius = outerRadius + 15;
    const labelRadius = outerRadius + 35;

    const lineX = cx + lineRadius * Math.cos(-midAngle * RADIAN);
    const lineY = cy + lineRadius * Math.sin(-midAngle * RADIAN);
    const textX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const textY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    const item = data[index];

    return (
      <g>
        <polyline
          stroke={item.color}
          strokeWidth={1}
          fill='none'
          points={`${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${
            cy + outerRadius * Math.sin(-midAngle * RADIAN)
          } ${lineX},${lineY}`}
        />
        <circle cx={lineX} cy={lineY} r={2} fill={item.color} />
        <text
          x={textX}
          y={textY - 6}
          fill='var(--color-text)'
          textAnchor={textX > cx ? 'start' : 'end'}
          dominantBaseline='central'
          className='text-[11px] font-semibold'
        >
          {item.name}
        </text>
        <text
          x={textX}
          y={textY + 6}
          fill='var(--color-muted)'
          textAnchor={textX > cx ? 'start' : 'end'}
          dominantBaseline='central'
          className='text-[10px]'
        >
          {`${rate.toFixed(1)}% `}
        </text>
      </g>
    );
  };

  return (
    <div className='w-full pb-element'>
      <ResponsiveContainer width='100%' height={height}>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={90}
            labelLine={false}
            label={renderCustomLabel}
            dataKey='value'
            isAnimationActive
            animationBegin={100}
            animationDuration={1000}
            stroke='var(--color-surface)'
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className='flex justify-center flex-wrap gap-component mt-component'>
        {data.map((item) => (
          <div key={item.name} className='flex items-center gap-tight text-label'>
            <span
              className='inline-block w-3 h-3 rounded-full'
              style={{ backgroundColor: item.color }}
            />
            <span className='text-muted'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
