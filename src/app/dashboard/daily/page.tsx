"use client";

import { GroupedTransactionSummary } from "@/features/transaction/types";
import DailySummaryRow from "./_components/DailySummaryRow";
import DailyTransactionGroup from "./_components/DailyTransactionGroup";
import { useDailyGroupedTransactions } from "./_components/useDailyGroupedTransactions";

export default function DailyPage() {
  const {
    groupedData,
    selectedDate,
    incomeTotal,
    expenseTotal,
    setSelectedDate,
  } = useDailyGroupedTransactions();

  return (
    <div className="p-4 pb-24">
      <DailySummaryRow
        incomeTotal={incomeTotal}
        expenseTotal={expenseTotal}
      ></DailySummaryRow>
      {groupedData.map((group: GroupedTransactionSummary) => (
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
