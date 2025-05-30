'use client';

// import { ActionCards } from '../components/ActionCard';
import RecurringExpenseList from '../../../modules/settings/components/RecurringExpenseList';

export default function InsightsRecurringPage() {
  return (
    <main className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* 🔁 반복 결제 리스트 */}
      <RecurringExpenseList />

      {/* 🛠 고정비 분리/관리 CTA */}
      {/* <ActionCards /> */}
    </main>
  );
}
