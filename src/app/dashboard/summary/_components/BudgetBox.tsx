"use client";

import { BudgetUsageItem } from "@/features/budget/types";

interface Props {
  item: BudgetUsageItem;
}

export default function BudgetBox({ item }: Props) {
  const progressColor =
    item.usedPercent >= 100
      ? "bg-red-500"
      : item.usedPercent >= 80
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {item.categoryName}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item.usedPercent}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full ${progressColor}`}
          style={{ width: `${Math.min(item.usedPercent, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1 dark:text-gray-400">
        <span>₩{item.usedAmount.toLocaleString()}</span>
        <span>₩{item.budgetAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}
