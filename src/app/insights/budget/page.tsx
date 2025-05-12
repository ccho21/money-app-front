'use client';

// import { ActionCards } from '../components/ActionCard';
import { BudgetSummaryCards } from '../components/BudgetSummaryCards';
import { BudgetUsageChart } from '../components/BudgetUsageChart';

export default function InsightsBudgetPage() {
  return (
    <main className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* 📊 예산 사용 현황 차트 */}
      <BudgetUsageChart />

      {/* 💡 초과 항목 요약 카드 */}
      <BudgetSummaryCards />

      {/* 🛠 예산 조정 CTA */}
      {/* <ActionCards /> */}
    </main>
  );
}
