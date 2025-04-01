"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { parse, startOfMonth, endOfMonth, format } from "date-fns";
import MonthlyItem from "./_components/MonthlyItem";
import TransactionSummaryBox from "../_components/TransactionSummaryBox";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import {
  TransactionSummary,
} from "@/features/transaction/types";
import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from "@/services/transactionService";
import { getDateRangeKey } from "@/lib/dateUtils";
import { FetchTransactionSummaryParams } from "@/features/shared/types";

export default function MonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionSummary[];
  }>({});

  const {
    state: { transactionSummaryResponse, isLoading },
  } = useTransactionStore();
  const {
    state: { date },
    actions: {setRange}
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: "Monthly", amount: 0 }),
    [date]
  );

  useEffect(() => {
    setRange("Yearly");

    const [startDate, endDate] = dateRangeKey.split("_");
    const params: FetchTransactionSummaryParams = {
      groupBy: "monthly",
      startDate,
      endDate,
    };
    const run = async () => {
      await fetchTransactionSummary(params);
    };
    run();
  }, [dateRangeKey]);

  const monthlyData = transactionSummaryResponse?.data || [];

  const handleToggle = useCallback(
    async (index: number, summary: TransactionSummary) => {
      const isOpening = openIndex !== index;
      setOpenIndex(isOpening ? index : null);

      const label = summary.label;
      if (openIndex !== index && !weeklySummaryByMonth[label]) {
        const monthDate = parse(label, "yyyy-MM", new Date());
        const startDate = format(startOfMonth(monthDate), "yyyy-MM-dd");
        const endDate = format(endOfMonth(monthDate), "yyyy-MM-dd");

        const params: FetchTransactionSummaryParams = {
          groupBy: "weekly",
          startDate,
          endDate,
        };

        // ✅ 내부 API 직접 호출
        const weeklyRes = await fetchTransactionSummaryWeekly(params);

        const weeklyData: TransactionSummary[] = weeklyRes?.data?.map(
          (item: TransactionSummary) => ({
            label: item.label,
            rangeStart: item.rangeStart,
            rangeEnd: item.rangeEnd,
            incomeTotal: item.incomeTotal,
            expenseTotal: item.expenseTotal,
            transactions: item.transactions,
          })
        );

        setWeeklySummaryByMonth((prev) => ({
          ...prev,
          [label]: weeklyData,
        }));
      }
    },
    [openIndex, weeklySummaryByMonth]
  );

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">불러오는 중...</p>;
  }

  if (!transactionSummaryResponse || !transactionSummaryResponse.data.length) {
    return <p className="text-center mt-10 text-gray-400">데이터가 없습니다</p>;
  }

  return (
    <div>
      <TransactionSummaryBox
        incomeTotal={transactionSummaryResponse?.incomeTotal}
        expenseTotal={transactionSummaryResponse?.expenseTotal}
      />

      {monthlyData.map((summary, index) => (
        <MonthlyItem
          key={summary.label}
          date={summary.label}
          income={summary.incomeTotal}
          expense={summary.expenseTotal}
          open={openIndex === index}
          onToggle={() => handleToggle(index, summary)}
          weeklyData={
            openIndex === index && weeklySummaryByMonth[summary.label]
              ? weeklySummaryByMonth[summary.label]
              : []
          }
        />
      ))}
    </div>
  );
}
