'use client';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import { ActionCards } from '../../modules/settings/components/ActionCard';
import { InsightCardList } from '../../modules/settings/components/InsightCardList';
import { PatternCharts } from '../../modules/settings/components/PatternCharts';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import { useInsightFilterStore } from '@/modules/insights/store/useInsightFilterStore';
import { useInsightPattern } from '../../modules/insights/hooks/queries';

export default function InsightsPatternPage() {
  const { query, getDateRangeKey } = useInsightFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const params = {
    startDate,
    endDate,
    timeframe: query.timeframe,
  };
  const { data, isLoading, error } = useInsightPattern(params);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (error || !data) {
    return <EmptyMessage />;
  }

  return (
    <>
      {/* 💡 인사이트 카드 목록 */}
      <InsightCardList insights={data.insights} />

      {/* 📊 요일별 / 시간대별 소비 차트 */}
      <PatternCharts byDay={data.byDay} byTime={data.byTime} />

      {/* 🛠 예산 조정 / 고정비 등 행동 유도 카드 */}
      <ActionCards />
    </>
  );
}
