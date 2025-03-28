'use client';

import { useState } from 'react';
import MonthlyItem from './_components/MonthlyItem';
import TransactionSummaryBox from '../_components/TransactionSummaryBox';

const mockMonthlyData = [
  {
    label: '2025-01-01',
    incomeTotal: 1500000,
    expenseTotal: 780000,
  },
  {
    label: '2025-02-01',
    incomeTotal: 1320000,
    expenseTotal: 890000,
  },
  {
    label: '2025-03-01',
    incomeTotal: 1250000,
    expenseTotal: 950000,
  },
];

export default function MonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ✅ 수입/지출 총합 계산
  const incomeTotal = mockMonthlyData.reduce((sum, item) => sum + item.incomeTotal, 0);
  const expenseTotal = mockMonthlyData.reduce((sum, item) => sum + item.expenseTotal, 0);

  return (
    <div>
      <TransactionSummaryBox incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      {mockMonthlyData.map((group, index) => (
        <MonthlyItem
          key={group.label}
          date={group.label}
          income={group.incomeTotal}
          expense={group.expenseTotal}
          open={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
