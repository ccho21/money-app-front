'use client';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import { useInsightFilterStore } from '@/modules/insights/store/useInsightFilterStore';
import { useInsightAlerts } from '../../../modules/insights/hooks/queries';
import { InsightCardList } from '../../../modules/settings/components/InsightCardList';
// import { ActionCards } from '../components/ActionCard';
// import { SpendingAlerts } from '../../../modules/settings/components/SpendingAlerts';

export default function InsightsAlertsPage() {
  const { query, getDateRangeKey } = useInsightFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');
  const params = {
    startDate,
    endDate,
    timeframe: query.timeframe,
  };
  const { data, isLoading, error } = useInsightAlerts(params);

  if (isLoading) {
    return <LoadingMessage message='Loading alert insights...' />;
  }

  if (error || !data) {
    return <EmptyMessage message='No alert data found.' />;
  }

  return (
    <main className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* ⚠️ 이상 소비 감지 카드 */}
      {/* <SpendingAlerts /> */}

      {/* 💡 알림 인사이트 카드 목록 */}
      <InsightCardList insights={data.insights} />

      {/* 🛠 예산 재설정, 알림 설정 유도 */}
      {/* <ActionCards /> */}
    </main>
  );
}
