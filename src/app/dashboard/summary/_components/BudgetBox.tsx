import React, { useEffect, useMemo } from "react";
import useBudgetStore from "@/features/budget/store";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Progress } from "@/components/ui/Progress";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export default function BudgetBox() {
  const { budgets, loading, error, fetchBudgetsAction } = useBudgetStore();

  useEffect(() => {
    fetchBudgetsAction();
  }, [fetchBudgetsAction]);

  const totalBudget = useMemo(
    () => budgets.reduce((acc, b) => acc + b.total, 0),
    [budgets]
  );

  const used = 32.48; // 임시값
  const remaining = totalBudget - used;
  const percentUsed = totalBudget > 0 ? (used / totalBudget) * 100 : 0;

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 dark:text-red-400">{error}</div>;

  return (
    <Card className="mt-4" url="/stats" title={"💳 Budget"}>
      {/* ✅ 5:7 그리드 */}
      <div className="grid grid-cols-12 gap-2 items-start">
        {/* 왼쪽: 총 예산 */}
        <div className="col-span-5">
          <div className="text-xs text-gray-500 font-semibold">
            Total Budget
          </div>
          <div className="text-[13px] font-normal text-black dark:text-white mt-1">
            {formatCurrency(totalBudget)}
          </div>
        </div>

        {/* 오른쪽: Progress + 금액 */}
        <div className="col-span-7 space-y-2">
          {/* ✅ 두꺼운 Progress Bar */}
          <div className="relative">
            <Progress value={percentUsed} className="h-3 rounded-full" />
            <div className="absolute right-0 -top-6 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-200">
              {percentUsed.toFixed(0)}%
            </div>
          </div>

          {/* ✅ 아래 텍스트 더 크게 */}
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span className="text-blue-600 font-medium">
              {formatCurrency(used)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {formatCurrency(remaining)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
