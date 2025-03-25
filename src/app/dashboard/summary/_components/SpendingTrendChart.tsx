"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: Record<string, number>; // 예: { '2025-03-24': 45000, ... }
}

export default function SpendingTrendChart({ data }: Props) {
  const chartData = Object.entries(data)
    .map(([date, amount]) => ({ date: date.slice(5), amount })) // MM-DD로 변환
    .sort((a, b) => a.date.localeCompare(b.date)); // 날짜 순 정렬

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="text-sm text-gray-500 mb-2">일자별 소비 추이</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={11} />
          <YAxis tickFormatter={(v) => `₩${(v / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(v: number) => `₩${v.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
