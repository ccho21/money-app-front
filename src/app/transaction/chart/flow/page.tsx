'use client';

import TransactionYearChart from '../../components/chart/TransactionYearChart';
import { InsightCard } from '../../components/chart/InsightCard';
import { MonthlySummaryGrid } from '../../components/chart/MonthlySummaryGrid';

const mockSummary = {
  monthly: [
    { month: 'January', income: 3200000, expense: 2400000, rate: 25 },
    { month: 'February', income: 3000000, expense: 2600000, rate: 13 },
  ],
  insight: '이번 분기 지출이 18% 증가했어요',
};

export default function TransactionChartFlowPage() {
  return (
    <main className='w-full px-component pb-[10vh] space-y-component'>
      <InsightCard text={mockSummary.insight} />
      <TransactionYearChart />
      <MonthlySummaryGrid data={mockSummary.monthly} />
    </main>
  );
}
