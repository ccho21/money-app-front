'use client';

import { useMemo } from 'react';
import EmptyMessage from '@/components/ui/message/emptyMessage';
import LoadingMessage from '@/components/ui/message/loadingMessage';
import { useInsightFilterStore } from '@/modules/insights/store/useInsightFilterStore';
import { useInsightAlerts } from '@/modules/insights/hooks/queries';
import { InsightCardList } from '@/modules/settings/components/InsightCardList';
import { SpendingAlerts } from '@/modules/settings/components/SpendingAlerts';
import { AlertInsightResponse, Insight } from '@/modules/insights/types/types';

export default function InsightsAlertsPage() {
  const { query, getDateRangeKey } = useInsightFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = {
    startDate,
    endDate,
    timeframe: query.timeframe,
  };

  const {
    data,
    isLoading,
    error,
  }: {
    data?: AlertInsightResponse;
    isLoading: boolean;
    error: unknown;
  } = useInsightAlerts(params);

  const filteredInsights: Insight[] = useMemo(() => {
    if (!data?.insights) return [];
    return data.insights.filter(
      (insight: Insight) =>
        insight.severity === 'warning' || insight.severity === 'critical'
    );
  }, [data]);

  if (isLoading) {
    return <LoadingMessage message="Loading alert insights..." />;
  }

  if (error || !data || filteredInsights.length === 0) {
    return <EmptyMessage message="No critical or warning insights found." />;
  }

  return (
    <>
      {/* ⚠️ 이상 소비 감지 카드 */}
      <SpendingAlerts />

      {/* 💡 알림 인사이트 카드 목록 */}
      <InsightCardList insights={filteredInsights} />
    </>
  );
}
