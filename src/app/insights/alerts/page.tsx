'use client';

// import { ActionCards } from '../components/ActionCard';
import { SpendingAlerts } from '../components/SpendingAlerts';

export default function InsightsAlertsPage() {
  return (
    <main className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* ⚠️ 이상 소비 감지 카드 */}
      <SpendingAlerts />

      {/* 🛠 예산 재설정, 알림 설정 유도 */}
      {/* <ActionCards /> */}
    </main>
  );
}
