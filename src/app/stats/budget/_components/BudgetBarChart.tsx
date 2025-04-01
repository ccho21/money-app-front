"use client";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useRef } from "react";

interface BudgetBarChartProps {
  data: { month: string; value: number }[];
  selectedMonth?: string;
  onSelect?: (month: string) => void;
  barColor?: string;
  bgColor?: string;
}

export default function BudgetBarChart({
  data,
  selectedMonth,
  onSelect,
  barColor = "#FF6240",
  bgColor = "#F9FAFB",
}: BudgetBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
        <div className="w-full overflow-x-auto scrollbar-hide" ref={containerRef}>
        <div
            className="min-w-[600px] h-36 rounded-xl"
            style={{ backgroundColor: bgColor }}
        >
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                barCategoryGap="30%"
            >
                <XAxis
                dataKey="month"
                interval={0}
                axisLine={false}
                tickLine={false}
                tick={{
                    fontSize: 12,
                    fill: "#888",
                }}
                />
                <Tooltip
                formatter={(value: number) => [
                    `₩${value.toLocaleString()}`,
                    "Amount",
                ]}
                />
                <Bar dataKey="value">
                {data.map((entry, index) => {
                    const isSelected = entry.month === selectedMonth;
                    return (
                    <Cell
                        key={`bar-${index}`}
                        fill={isSelected ? barColor : "#E5E7EB"}
                        cursor="pointer"
                        onClick={() => onSelect?.(entry.month)}
                    />
                    );
                })}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>
        </div>
  );
}
