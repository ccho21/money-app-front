"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccountStore } from "@/stores/useAccountStore";
import { format } from "date-fns";
import { getDateRange } from "@/lib/utils";
import SummaryBox from "@/components/ui/SummaryBox";
import AccountsBox from "./_components/AccountsBox";
import BudgetBox from "./_components/BudgetBox";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { AccountTransactionSummaryParams } from "@/features/accounts/types";
import { useBudgetStore } from "@/stores/useBudgetStore";

export default function SummaryPage() {
  const {
    budgetUsageItems,
    isLoading: isBudgetLoading,
    fetchBudgetUsage,
  } = useBudgetStore();
  const {
    summaries,
    isLoading: isAccountLoading,
    fetchAccountTransactionSummary,
  } = useAccountStore();
  const { date } = useDateFilterStore();

  const dateRange = useMemo(
    () => getDateRange(date, { unit: "month" }),
    [date]
  );

  const incomeTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.incomeTotal, 0),
    [summaries]
  );
  const expenseTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.expenseTotal, 0),
    [summaries]
  );
  useEffect(() => {
    const params: AccountTransactionSummaryParams = {
      ...dateRange,
    };

    fetchBudgetUsage(params);

    fetchAccountTransactionSummary(params);
  }, [fetchAccountTransactionSummary, fetchBudgetUsage]);

  const totalBudgetAmount = useMemo(
    () => budgetUsageItems.reduce((acc, b) => acc + b.budgetAmount, 0),
    [budgetUsageItems]
  );

  const totalBudgetUsed = useMemo(
    () => budgetUsageItems.reduce((acc, b) => acc + b.usedAmount, 0),
    [budgetUsageItems]
  );

  const totalBudgetUsedPercent = useMemo(
    () =>
      budgetUsageItems.reduce((acc, b) => acc + b.usedPercent, 0) /
      budgetUsageItems.length,
    [budgetUsageItems]
  );

  const totalItem = {
    categoryId: "",
    categoryName: "Total Budget",
    budgetAmount: totalBudgetAmount,
    usedAmount: totalBudgetUsed,
    usedPercent: totalBudgetUsedPercent,
  };

  if (isBudgetLoading || isAccountLoading) {
    return <p className="text-center mt-10 text-gray-500">불러오는 중...</p>;
  }

  if (!summaries) {
    return <p className="text-center mt-10 text-gray-400">데이터가 없습니다</p>;
  }

  return (
    <div className="px-4 space-y-6">
      <SummaryBox
        items={[
          {
            label: "Income",
            value: incomeTotal,
            color: incomeTotal > 0 ? "text-[#3C50E0]" : "text-gray-400",
            prefix: "₩",
          },
          {
            label: "Exp.",
            value: expenseTotal,
            color: expenseTotal > 0 ? "text-[#fb5c4c]" : "text-gray-400",
            prefix: "₩",
          },
          {
            label: "Total",
            value: incomeTotal - expenseTotal,
            color: "text-gray-900 dark:text-white",
            prefix: "₩",
          },
        ]}
      />

      <AccountsBox accounts={summaries} />
      <BudgetBox item={totalItem} />
    </div>
  );
}
