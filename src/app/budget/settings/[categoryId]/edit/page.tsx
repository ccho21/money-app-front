// 📄 경로: src/app/budget/settings/edit/page.tsx

"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useBudgetStore } from "../../_components/useBudgetStore";
import { useBudgetCategoryFormStore } from "../../_components/useBudgetCategoryFormStore";
import { getDateRangeKey } from "@/lib/date.util";
import { DateFilterParams } from "@/features/shared/types";
import { fetchBudgetCategoriesByCategoryId } from "../../_components/budgetService";

export default function EditBudgetPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const {
    state: { budgetCategory, isLoading },
  } = useBudgetStore();
  const {
    state: { date, range },
    actions: { setRange },
  } = useDateFilterStore();

  const {
    actions: { setField },
  } = useBudgetCategoryFormStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: "monthly", amount: 0 }),
    [date]
  );

  useEffect(() => {
    console.log("## categoryId", categoryId);
    const run = async () => {
      if (!categoryId) return;
      const [startDate, endDate] = dateRangeKey.split("_");
      const filter: DateFilterParams = {
        startDate,
        endDate,
        groupBy: range,
      };
      console.log("### filter", filter);
      await fetchBudgetCategoriesByCategoryId(String(categoryId), filter);
    };
    run();
  }, [dateRangeKey, setRange, range]);

  if (!categoryId) return <div>잘못된 접근입니다</div>;

  console.log("##3", budgetCategory);
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <main className="p-4 space-y-4">
        {/* 안내 메시지 */}
        <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-300">
          You can set the budget settings for each month. If you change the
          default budget, it will be applied starting next month.
        </div>

        {/* 예산 리스트 */}
        {/* <div className="space-y-2">
          {filtered.map((b) => {
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
                <span>
                  {b.startDate} ~ {b.endDate}
                </span>
                <span>${b.amount.toFixed(2)}</span>
              </button>
            );
          })}
        </div> */}

        {/* 선택 시 폼 렌더링 */}
        {/* {selectedKey && (
          <div className="mt-6 border-t pt-4">
            <BudgetCategoryForm />
          </div>
        )} */}
      </main>
    </div>
  );
}
