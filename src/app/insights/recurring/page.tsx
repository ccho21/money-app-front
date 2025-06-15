'use client';

import EmptyMessage from '@/components/ui/message/emptyMessage';
import LoadingMessage from '@/components/ui/message/loadingMessage';
import { useInsightFilterStore } from '@/modules/insights/store/useInsightFilterStore';
import { useInsightRecurring } from '@/modules/insights/hooks/queries';
import { InsightCardList } from '@/modules/settings/components/InsightCardList';
import RecurringExpenseList from '@/modules/settings/components/RecurringExpenseList';

export default function InsightsRecurringPage() {
  const { query, getDateRangeKey } = useInsightFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = {
    startDate,
    endDate,
    timeframe: query.timeframe,
  };

  const { data, isLoading, error } = useInsightRecurring(params);

  if (isLoading) {
    return <LoadingMessage message='Loading recurring insights...' />;
  }

  if (error || !data) {
    return <EmptyMessage message='No recurring insight found.' />;
  }

  return (
    <>
      {/* 💡 인사이트 카드 목록 */}
      <InsightCardList insights={data.insights} />

      {/* 🔁 반복 결제 리스트 (ChartDataItem 전달) */}
      <RecurringExpenseList summary={data.recurringSummary} />

      {/* 🛠 고정비 분리/관리 CTA */}
      {/* <ActionCards /> */}
    </>
  );
}
