import { Insight } from '@/modules/insights/types/types';
import { InsightCard } from './InsightCard'; // 위 InsightCard 그대로 사용

interface Props {
  insights: Insight[];
}

export function InsightList({ insights }: Props) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className='space-y-2'>
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
}
