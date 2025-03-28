'use client';

import { useEffect, useState } from 'react';
import DailyTransactionGroup from './_components/DailyTransactionGroup';
import SummaryBox from '@/components/ui/SummaryBox';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

export default function DailyPage() {
  const { fetchTransactionGroups, transactionGroups, isLoading } =
    useTransactionStore();
  const { date, type } = useDateFilterStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
    fetchTransactionGroups(
      type,
      String(date.getFullYear()),
      String(date.getMonth() + 1)
    );
  }, [fetchTransactionGroups, type, date]);

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionGroups) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <>
      <SummaryBox
        items={[
          {
            label: 'Income',
            value: transactionGroups.incomeTotal,
            color:
              transactionGroups.incomeTotal > 0
                ? 'text-[#3C50E0]'
                : 'text-gray-400',
            prefix: '₩',
          },
          {
            label: 'Exp.',
            value: transactionGroups.expenseTotal,
            color:
              transactionGroups.expenseTotal > 0
                ? 'text-[#fb5c4c]'
                : 'text-gray-400',
            prefix: '₩',
          },
          {
            label: 'Total',
            value:
              transactionGroups.incomeTotal - transactionGroups.expenseTotal,
            color: 'text-gray-900 dark:text-white',
            prefix: '₩',
          },
        ]}
      />

      <div className='mt-4 space-y-4'>
        {transactionGroups.data.map((group) => (
          <DailyTransactionGroup
            key={group.label}
            group={group}
            selected={selectedDate === group.label}
            onSelect={() => setSelectedDate(group.label)}
          />
        ))}
      </div>
    </>
  );
}
