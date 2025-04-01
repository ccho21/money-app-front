"use client";

import { useEffect, useMemo } from "react";
import DailyTransactionGroup from "./_components/DailyTransactionGroup";
import SummaryBox from "@/components/ui/SummaryBox";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { FetchTransactionSummaryParams } from "@/features/transaction/types";
import { getDateRangeKey } from "@/lib/utils";
import { fetchTransactionSummary } from "@/services/transactionService";

export default function DailyPage() {
  const {
    state: { transactionSummaryResponse, isLoading },
  } = useTransactionStore();
  const {
    state: { date },
    actions: {setRange}
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: "month", amount: 0 }),
    [date]
  );

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
   setRange("Monthly");

    const [startDate, endDate] = dateRangeKey.split("_");
    const params: FetchTransactionSummaryParams = {
      groupBy: "daily",
      startDate,
      endDate,
    };
    const run = async () => {
      await fetchTransactionSummary(params);
    };
    run();
  }, [dateRangeKey]);

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
          <DailyTransactionGroup key={group.label} group={group} />
        ))}
      </div>
    </>
  );
}
