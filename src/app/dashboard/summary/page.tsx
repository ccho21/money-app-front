'use client';

import SummaryBox from '@/components/summary/SummaryBox';
import BudgetSummaryBox from '@/components/summary/BudgetSummaryBox';
import { Wallet } from 'lucide-react';

export default function Summary() {
  return (
    <div className="p-4 space-y-4">
      <SummaryBox
        icon={<Wallet className="w-4 h-4 text-gray-500" />}
        title="Accounts"
        description="Exp. (Cash, Accounts)"
        amount={0}
      />

      <BudgetSummaryBox
        total={0}
        used={0}
      />
    </div>
  );
}
