'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: {
    category: string;
    amount: number;
  }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ff4d4f'];

export default function CategoryPieChart({ data }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="text-sm text-gray-500 mb-2">카테고리별 소비 비율</div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label={({ category }) => category}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
