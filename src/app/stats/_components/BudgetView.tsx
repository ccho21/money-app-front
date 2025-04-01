"use client";

import { useEffect } from "react";
import { useStatsStore } from "@/stores/useStatsStore";
import { fetchStatsByBudget } from "@/services/statsService";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { getDateRangeKey } from "@/lib/dateUtils";
import { TransactionType } from "@/features/transaction/types";
import { CategoryListItem } from "./CategoryListItem";
import { useRouter } from "next/navigation";

export default function BudgetView() {
  const router = useRouter();
  const {
    state: { date, range, transactionType },
  } = useDateFilterStore();

  const {
    state: { budgetResponse, isLoading },
  } = useStatsStore();

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey(date, {
        unit: range,
        amount: 0,
      }).split("_");
      await fetchStatsByBudget({
        startDate,
        endDate,
        type: transactionType as TransactionType,
      });
    };

    run();
  }, [date, transactionType, range]);

  const handleClick = (id: string) => {
    router.push(`/stats/budget/${id}`);
  };
  if (isLoading) return <p className="p-4">Loading...</p>;

  if (!budgetResponse) {
    return <p className="text-center mt-10 text-gray-400">데이터가 없습니다</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Remaining ({transactionType === "expense" ? "Expense" : "Income"})
          </p>
          <p className="text-2xl font-semibold dark:text-white">
            {budgetResponse.totalRemaining.toLocaleString()}원
          </p>
        </div>

        <button
          className="text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300"
          disabled
        >
          Budget Setting
        </button>
      </div>
      <div className="bg-white dark:bg-zinc-800 divide-y border-t border-gray-200 rounded-xl overflow-hidden">
        {budgetResponse.data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.budget}
            color={item.color}
            onClick={() => handleClick(item.categoryId)}
            variant="with-progress-a"
          />
        ))}
      </div>
    </div>
  );
}
