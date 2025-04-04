"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { parse, startOfMonth, endOfMonth, format } from "date-fns";

import MonthlyItem from "./_components/MonthlyItem";
import TransactionSummaryBox from "../_components/TransactionSummaryBox";

import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useShallow } from "zustand/react/shallow";

import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from "@/services/transactionService";
import { TransactionSummary } from "@/features/transaction/types";
import { DateFilterParams } from "@/features/shared/types";
import { getDateRangeKey } from "@/lib/date.util";

export default function MonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionSummary[];
  }>({});

  // ✅ shallow 최적화된 상태 선택
  const { transactionSummaryResponse, isLoading } = useTransactionStore(
    useShallow((s) => ({
      transactionSummaryResponse: s.transactionSummaryResponse,
      isLoading: s.isLoading,
    }))
  );

  const {
    state: { date, range },
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: "monthly", amount: 0 }),
    [date]
  );

  useEffect(() => {
    if (range !== "yearly")
      useDateFilterStore.getState().actions.setRange("yearly");
  }, []);
  // ✅ 최초 로딩 시 monthly 데이터 fetch
  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split("_");
    const params: DateFilterParams = {
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

  // ✅ 월별 항목 toggle + weekly 데이터 요청
  const handleToggle = useCallback(
    async (index: number, summary: TransactionSummary) => {
      const isOpening = openIndex !== index;
      setOpenIndex(isOpening ? index : null);

      const label = summary.label;

      // 열리는 항목이며, 아직 캐시에 없는 경우만 요청
      if (isOpening && !weeklySummaryByMonth[label]) {
        const monthDate = parse(label, "yyyy-MM", new Date());
        const startDate = format(startOfMonth(monthDate), "yyyy-MM-dd");
        const endDate = format(endOfMonth(monthDate), "yyyy-MM-dd");

        const params: DateFilterParams = {
          groupBy: "weekly",
          startDate,
          endDate,
        };

        const weeklyRes = await fetchTransactionSummaryWeekly(params);
        const weeklyData: TransactionSummary[] = weeklyRes?.data ?? [];

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
        incomeTotal={transactionSummaryResponse.incomeTotal}
        expenseTotal={transactionSummaryResponse.expenseTotal}
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
