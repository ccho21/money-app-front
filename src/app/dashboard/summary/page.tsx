"use client";

import { Wallet } from "lucide-react";
import SummaryBox from "./_components/SummaryBox";
import { useSummaryData } from "./_components/useSummaryData";
import TopCategoryBox from "./_components/TopCategoryBox";
import CategoryPieChart from "./_components/CategoryPieChart";
import SpendingTrendChart from "./_components/SpendingTrendChart";
import BudgetOverAlertList from "./_components/BudgetOverAlertList";

export default function SummaryPage() {
  const { summary } = useSummaryData();

  if (!summary) return <div className="p-4">불러오는 중...</div>;

  return (
    <div className="p-4 space-y-4">
      <SummaryBox
        icon={<Wallet className="w-4 h-4 text-gray-500" />}
        title="Total Spent"
        description="이번 달 총 지출"
        amount={summary.totalSpent}
      />

      <TopCategoryBox
        category={summary.topCategory.category}
        amount={summary.topCategory.amount}
      />

      <CategoryPieChart data={summary.byCategory} />

      <SpendingTrendChart data={summary.byDate} />

      <BudgetOverAlertList alerts={summary.budgetAlerts} />

      {/* 추가 컴포넌트로 확장 예정 */}
    </div>
  );
}
