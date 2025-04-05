// 📄 경로: src/app/budget/settings/edit/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { fromUTCToLocal, getDateRangeKey } from "@/lib/date.util";
import { DateFilterParams } from "@/features/shared/types";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBudgetStore } from "../../_components/useBudgetStore";
import { useBudgetCategoryFormStore } from "../../_components/useBudgetCategoryFormStore";
import { fetchBudgetCategoriesByCategoryId } from "../../_components/budgetService";
import TopNav from "@/components/common/TopNav";
import DateNavigator from "@/components/ui/DateNavigator";

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const {
    state: { date, range },
  } = useDateFilterStore();

  const {
    state: { budgetCategoryGroupResponse },
  } = useBudgetStore();
  const { reset } = useBudgetCategoryFormStore((s) => s.actions);

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: range, amount: 0 }),
    [date, range]
  );

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    if (range !== "yearly")
      useDateFilterStore.getState().actions.setRange("yearly");
    const run = async () => {
      if (!categoryId) return;
      const [startDate, endDate] = dateRangeKey.split("_");
      const filter: DateFilterParams = {
        startDate,
        endDate,
        groupBy: "monthly",
      };

      await fetchBudgetCategoriesByCategoryId(String(categoryId), filter);
      reset();
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, range, reset]);

  const budgets = budgetCategoryGroupResponse?.budgets ?? [];

  const handleSelect = (item: (typeof budgets)[0]) => {
    console.log("### date", date);
    console.log("### startDate", fromUTCToLocal(item.startDate));
    console.log("### endDate", fromUTCToLocal(item.endDate));

    if (item.categoryId) {
      router.push(`/budget/settings/${categoryId}/new`);
    } else {
      router.push(`/budget/settings/${categoryId}/edit`);
    }
  };

  if (!categoryId) return <div className="p-4">잘못된 접근입니다</div>;

  return (
    <div>
      <TopNav title="Budget Setting" onBack={() => router.back()} />
      <DateNavigator withTransactionType={true} />
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <main className="p-4 space-y-4">
          {/* 안내 메시지 */}
          <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-300">
            You can set the budget settings for each month. If you change the
            default budget, it will be applied starting next month.
          </div>

          {/* 예산 리스트 */}
          <div className="space-y-2">
            {budgets.map((b) => {
              const key = `${b.startDate}_${b.endDate}`;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(b)}
                  className={cn(
                    "w-full flex justify-between items-center rounded-lg border px-4 py-3",
                    selectedKey === key
                      ? "border-red-500 text-red-500"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <span>{b.label}</span>
                  <span>${b.budgetAmount.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
