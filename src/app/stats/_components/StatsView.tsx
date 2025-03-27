'use client';

import { formatCurrency } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [{ name: 'Food', value: 32.48, percent: 100, color: '#fb5c4c' }];

export default function StatsView() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-500'>Income</span>
        <span className='text-sm font-semibold text-red-500'>
          Exp. {formatCurrency(total)}
        </span>
      </div>

      {/* Pie Chart */}
      <div className='w-full h-64'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Label */}
      <div className='text-center text-sm text-gray-800 dark:text-white'>
        <p className='font-medium'>{data[0].name}</p>
        <p className='text-gray-500'>{data[0].percent.toFixed(1)} %</p>
      </div>

      {/* 하단 리스트 */}
      <div className='mt-4 border-t pt-4'>
        {data.map((item) => (
          <div
            key={item.name}
            className='flex justify-between items-center py-2'
          >
            <span className='text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full'>
              {item.percent.toFixed(0)}%
            </span>
            <span className='text-sm text-gray-800 dark:text-white'>
              {item.name}
            </span>
            <span className='text-sm font-medium'>
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
