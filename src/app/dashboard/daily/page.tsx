'use client';

import DailySummaryRow from './_components/DailySummaryRow';
import DailyTransactionGroup from './_components/DailyTransactionGroup';
import { useState } from 'react';
import {
  GroupedTransactionDTO,
  TransactionType,
} from '@/features/transaction/types';

const mockGroupedTransactionDTO: GroupedTransactionDTO = {
  range: 'date',
  baseDate: '2025-03-26',
  incomeTotal: 100,
  expenseTotal: 32.48,
  data: [
    {
      label: '2025-03-26',
      incomeTotal: 0,
      expenseTotal: 32.48,
      transactions: [
        {
          id: 'tx1',
          type: 'expense' as TransactionType,
          amount: 4.48,
          category: { name: 'Coffee', icon: '☕️' },
          note: 'Morning Coffee',
          date: '2025-03-26T08:15:00',
        },
        {
          id: 'tx2',
          type: 'expense' as TransactionType,
          amount: 20.0,
          category: { name: 'Food', icon: '🍱' },
          note: 'Lunch',
          date: '2025-03-26T12:40:00',
        },
        {
          id: 'tx3',
          type: 'expense' as TransactionType,
          amount: 8.0,
          category: { name: 'Transport', icon: '🚌' },
          note: 'Subway',
          date: '2025-03-26T18:20:00',
        },
      ],
    },
    {
      label: '2025-03-25',
      incomeTotal: 100,
      expenseTotal: 0,
      transactions: [
        {
          id: 'tx4',
          type: 'income' as TransactionType,
          amount: 100,
          category: { name: 'Salary', icon: '💼' },
          note: 'March Pay',
          date: '2025-03-25T09:00:00',
        },
      ],
    },
  ],
};

export default function DailyPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className='p-4 pb-24'>
      <DailySummaryRow
        incomeTotal={mockGroupedTransactionDTO.incomeTotal}
        expenseTotal={mockGroupedTransactionDTO.expenseTotal}
      />

      {mockGroupedTransactionDTO.data.map((group) => (
        <DailyTransactionGroup
          key={group.label}
          group={group}
          selected={selectedDate === group.label}
          onSelect={() => setSelectedDate(group.label)}
        />
      ))}
    </div>
  );
}
