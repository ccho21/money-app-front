// src/app/insights/page.tsx

'use client';

import { ActionCards } from './components/ActionCard';
import { InsightCardList } from './components/InsightCardList';
import { PatternCharts } from './components/PatternCharts';

export default function InsightsPatternPage() {
  return (
    <main className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* 💡 인사이트 카드 목록 */}
      <InsightCardList />

      {/* 📊 요일별 / 시간대별 소비 차트 */}
      <PatternCharts />

      {/* 🛠 예산 조정 / 고정비 등 행동 유도 카드 */}
      <ActionCards />
    </main>
  );
}
