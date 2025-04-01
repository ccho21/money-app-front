"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

import { getExpenseStats, getIncomeStats } from "@/features/stats/api";
import { ExpenseStat, IncomeStat } from "@/features/stats/types";
import { CategoryListItem } from "./CategoryListItem";

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

// 🔧 카테고리별 색상 맵핑 (실제 카테고리 ID 기준으로)
const categoryColors: Record<string, string> = {
  food: "#fb923c",
  social: "#fb5c4c",
  transport: "#60a5fa",
  shopping: "#a78bfa",
  health: "#34d399",
  etc: "#9ca3af",
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
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm"
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
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        className="text-xs"
      >
        {value.toLocaleString()}원
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        className="text-xs"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export default function StatsView() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "expense";

  const [data, setData] = useState<CategoryChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const mockData = {
    expense: [
      {
        categoryId: "food",
        categoryName: "Food",
        amount: 32000,
        percentage: 34.0,
      },
      {
        categoryId: "social",
        categoryName: "Social Life",
        amount: 62000,
        percentage: 66.0,
      },
    ],
    income: [
      {
        categoryId: "salary",
        categoryName: "Salary",
        amount: 1500000,
        percentage: 90.0,
      },
      {
        categoryId: "side",
        categoryName: "Side Hustle",
        amount: 150000,
        percentage: 10.0,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tab = (searchParams.get("tab") || "expense") as
          | "expense"
          | "income";
        const raw = mockData[tab];
        const categories = raw.map((item) => ({
          name: item.categoryName,
          value: item.amount,
          percent: item.percentage,
          color: categoryColors[item.categoryId] || "#9ca3af",
        }));
        setData(categories);
      } catch (e) {
        console.error(`❌ ${tab} stats 불러오기 실패`, e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tab]);

  if (isLoading) return <p className="p-4">Loading...</p>;

  if (!data || !data.length) {
    return <p className="text-center mt-10 text-gray-400">데이터가 없습니다</p>;
  }

  return (
    <div className="p-4">
      {data.length > 0 && (
        <div className="w-full h-64 px-3 py-6 mb-4 bg-white dark:bg-zinc-800 rounded-xl">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 카테고리 리스트 (공통) */}
      <div className="bg-white dark:bg-zinc-800 divide-y border-t border-gray-200 rounded-xl overflow-hidden">
        {data.map((item) => (
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
