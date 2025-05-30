'use client';

import { useInsightFilterStore } from '@/modules/insights/store/useInsightFilterStore';
import { BudgetSummaryCards } from '../../../modules/settings/components/BudgetSummaryCards';
import { BudgetUsageChart } from '../../../modules/settings/components/BudgetUsageChart';
import { useInsightBudget } from '../../../modules/insights/hooks/queries';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import EmptyMessage from '@/components/ui/custom/emptyMessage';

export default function InsightsBudgetPage() {
  const { query, getDateRangeKey } = useInsightFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const params = {
    startDate,
    endDate,
    timeframe: query.timeframe,
  };
  const { data, isLoading, error } = useInsightBudget(params);

  if (isLoading) {
    return <LoadingMessage message='Loading budget insights...' />;
  }

  if (error || !data) {
    return <EmptyMessage message='No budget data found.' />;
  }

  return (
    <main className='w-full min-h-screen bg-background text-foreground px-component pt-component pb-section space-y-component'>
      {/* 📊 예산 사용 현황 차트 */}
      <BudgetUsageChart byCategory={data.byCategory} />

      {/* 💡 초과 항목 요약 카드 */}
      <BudgetSummaryCards insights={data.insights} />

      {/* 🛠 예산 조정 CTA */}
      {/* <ActionCards /> */}
    </main>
  );
}
