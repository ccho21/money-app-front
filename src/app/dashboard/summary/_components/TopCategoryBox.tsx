"use client";

interface Props {
  category: string;
  amount: number;
}

export default function TopCategoryBox({ category, amount }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm space-y-1">
      <div className="text-sm text-gray-500">가장 많이 소비한 카테고리</div>
      <div className="text-lg font-semibold text-gray-800 dark:text-white">
        {category}
      </div>
      <div className="text-sm text-blue-500">₩{amount.toLocaleString()}</div>
    </div>
  );
}
