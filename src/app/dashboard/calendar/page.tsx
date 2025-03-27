'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css'; // 커스터마이징 CSS 별도 작성
import TransactionDetailSheet from './_components/TransactionDetailSheet';

interface Transaction {
  id: number;
  category: string;
  memo: string;
  method: string;
  amount: number;
  date: string; // yyyy-mm-dd
}

// ⚙️ Mock 데이터
const mockTransactions: Transaction[] = [
  {
    id: 1,
    category: 'Food',
    memo: '뭔데?',
    method: 'Cash',
    amount: -2,
    date: '2025-03-25',
  },
  {
    id: 2,
    category: 'Food',
    memo: '뭔데?',
    method: 'Cash',
    amount: -3,
    date: '2025-03-25',
  },
  {
    id: 3,
    category: 'Food',
    memo: '커피2',
    method: 'Cash',
    amount: -3,
    date: '2025-03-25',
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const getDateStr = (date: Date) => date.toISOString().split('T')[0];

  const currentMonthTransactions = mockTransactions.filter((t) =>
    t.date.startsWith('2025-03')
  );

  const groupedData: Record<string, Transaction[]> =
    currentMonthTransactions.reduce((acc, cur) => {
      acc[cur.date] = acc[cur.date] || [];
      acc[cur.date].push(cur);
      return acc;
    }, {} as Record<string, Transaction[]>);

  const calcSummary = Object.values(groupedData).flat();
  const income = calcSummary
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = calcSummary
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className='max-w-md mx-auto px-4 pb-24'>
      <Calendar
        calendarType='gregory'
        value={selectedDate || new Date()}
        onClickDay={handleDateClick}
        showNavigation={false}
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        tileContent={({ date }) => {
          const key = getDateStr(date);
          const transactions = groupedData[key];
          if (!transactions) return null;
          const total = transactions.reduce((sum, t) => sum + t.amount, 0);
          return (
            <div
              className={`text-[13px] mt-1 ${
                total < 0 ? 'text-[#F04438]' : 'text-[#3C50E0]'
              }`}
            >
              ₩{Math.abs(total).toLocaleString()}
            </div>
          );
        }}
        tileClassName={({ date, view }) => {
          const isSelected =
            selectedDate && getDateStr(date) === getDateStr(selectedDate);
          const isToday = getDateStr(date) === getDateStr(new Date());

          return [
            'relative border border-gray-200 dark:border-zinc-700 text-[13px] leading-snug rounded-md transition-colors duration-150',
            isSelected && 'bg-[#3C50E0] text-white',
            isToday && 'border-[#3C50E0]',
          ]
            .filter(Boolean)
            .join(' ');
        }}
        className='w-full !text-sm custom-calendar'
      />

      {/* Bottom Floating Button */}
      <div className='fixed bottom-20 right-4 z-30'>
        <button className='w-14 h-14 bg-red-500 text-white rounded-full text-2xl shadow-lg'>
          +
        </button>
      </div>

      {/* Modal Sheet */}
      {selectedDate && (
        <TransactionDetailSheet
          open={open}
          date={selectedDate}
          transactions={groupedData[getDateStr(selectedDate)] || []}
          onClose={() => setOpen(false)}
          onPrev={() =>
            setSelectedDate(
              (prev) =>
                new Date(
                  prev!.getFullYear(),
                  prev!.getMonth(),
                  prev!.getDate() - 1
                )
            )
          }
          onNext={() =>
            setSelectedDate(
              (prev) =>
                new Date(
                  prev!.getFullYear(),
                  prev!.getMonth(),
                  prev!.getDate() + 1
                )
            )
          }
        />
      )}
    </div>
  );
}
