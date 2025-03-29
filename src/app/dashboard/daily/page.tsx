"use client";

import { useEffect, useMemo, useState } from "react";
import DailyTransactionGroup from "./_components/DailyTransactionGroup";
import SummaryBox from "@/components/ui/SummaryBox";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { FetchTransactionSummaryParams } from "@/features/transaction/types";
import { getDateRange } from "@/lib/utils";

export default function DailyPage() {
  const { fetchTransactionSummary, transactionSummaryResponse, isLoading } =
    useTransactionStore();
  const { date } = useDateFilterStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dateRange = useMemo(() => getDateRange(date, { unit: "month" }), [date]);

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
    const params: FetchTransactionSummaryParams = {
      groupBy: "daily",
      ...dateRange,
    };
    fetchTransactionSummary(params);
  }, [fetchTransactionSummary, date]);

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">불러오는 중...</p>;
  }

  if (!transactionSummaryResponse) {
    return <p className="text-center mt-10 text-gray-400">데이터가 없습니다</p>;
  }

  return (
    <>
      <SummaryBox
        items={[
          {
            label: "Income",
            value: transactionSummaryResponse.incomeTotal,
            color:
              transactionSummaryResponse.incomeTotal > 0
                ? "text-[#3C50E0]"
                : "text-gray-400",
            prefix: "₩",
          },
          {
            label: "Exp.",
            value: transactionSummaryResponse.expenseTotal,
            color:
              transactionSummaryResponse.expenseTotal > 0
                ? "text-[#fb5c4c]"
                : "text-gray-400",
            prefix: "₩",
          },
          {
            label: "Total",
            value:
              transactionSummaryResponse.incomeTotal -
              transactionSummaryResponse.expenseTotal,
            color: "text-gray-900 dark:text-white",
            prefix: "₩",
          },
        ]}
      />

      <div className="mt-4 space-y-4">
        {transactionSummaryResponse.data.map((group) => (
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
