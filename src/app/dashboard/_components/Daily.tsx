'use client';

import TransactionItem from "@/components/dashboard/TransactionItem";

export default function Daily() {
  // 추후 서버 데이터 or Zustand 연동 예정
  const transactions = [
    { type: 'income', amount: 80000, note: '급여' },
    { type: 'expense', amount: 12000, note: '점심식사' },
    { type: 'expense', amount: 4000, note: '커피' },
  ];

  return (
    <div className="p-4">
      {/* 날짜 헤더 */}
      <div className="flex justify-between items-center mb-2 text-sm text-gray-400 dark:text-gray-500">
        <span>24 Mon</span>
        <div className="space-x-2">
          <span className="text-blue-500">₩0</span>
          <span className="text-red-500">₩0</span>
        </div>
      </div>

      {/* 거래 리스트 */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow divide-y">
        {transactions.map((tx, index) => (
          <TransactionItem
            key={index}
            type={tx.type as 'income' | 'expense'}
            amount={tx.amount}
            note={tx.note}
          />
        ))}
      </div>
    </div>
  );
}
