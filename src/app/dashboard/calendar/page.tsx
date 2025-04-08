'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useShallow } from 'zustand/react/shallow';

import { get } from '@/features/shared/api';
import { fetchTransactionCalendar } from '@/services/transactionService';

import {
  TransactionSummary,
  TransactionSummaryResponse,
} from '@/features/transaction/types';
import { getDateRangeKey } from '@/lib/date.util';
import { formatDate } from '@/lib/date.util';
import CalendarWithTransactions from './_components/CalendarWithTransactions';
import TransactionDetailView from './_components/TransactionDetailView';
import Panel from '@/components/ui/Panel';

export default function CalendarPage() {
  const { transactionCalendarItems, transactionSummaryResponse, isLoading } =
    useTransactionStore(
      useShallow((s) => ({
        transactionCalendarItems: s.transactionCalendarItems,
        transactionSummaryResponse: s.transactionSummaryResponse,
        isLoading: s.isLoading,
      }))
    );
  const { setTransactionSummaryResponse } = useTransactionStore().actions;

  const {
    state: { date, range },
    actions: { setRange },
  } = useDateFilterStore();

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date;
    summary?: TransactionSummary;
    open: boolean;
  } | null>(null);

  const calendarTileMap = useMemo(() => {
    const map = new Map<string, JSX.Element>();

    transactionCalendarItems.forEach((item) => {
      const hasIncome = item.income > 0;
      const hasExpense = item.expense > 0;

      if (!hasIncome && !hasExpense) return;

      map.set(
        item.date,
        <div className='text-[10px]'>
          {hasIncome && (
            <div className='text-blue-500'>
              +${item.income.toLocaleString()}
            </div>
          )}
          {hasExpense && (
            <div className='text-red-500'>
              -${item.expense.toLocaleString()}
            </div>
          )}
        </div>
      );
    });

    return map;
  }, [transactionCalendarItems]);

  // ✅ range 변경 최적화 (이미 monthly이면 호출 안함)
  useEffect(() => {
    if (range !== 'monthly') {
      setRange('monthly');
    }
  }, [range, setRange]);

  // ✅ 이미 호출한 월이면 다시 요청하지 않음
  useEffect(() => {
    const run = async () => {
      console.log('### CALENDAR fetchTransactionSummary');
      await fetchTransactionCalendar(date.toISOString());
    };
    run();
  }, [date]);

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  const handleDateClick = async (clickedDate: Date) => {
    const dateStr = formatDate(clickedDate);

    const fromStore = transactionSummaryResponse?.data.find(
      (g) => g.label === dateStr
    );
    if (fromStore) {
      setSelectedDetail({ date: clickedDate, summary: fromStore, open: true });
      return;
    }

    try {
      const [startDate, endDate] = dateRangeKey.split('_');
      const params = new URLSearchParams({
        groupBy: 'daily',
        startDate,
        endDate,
      });

      const res = await get<TransactionSummaryResponse>(
        `/transactions/summary?${params.toString()}`
      );

      const summary = res.data?.find((s) => s.label === dateStr);
      if (summary) {
        if (transactionSummaryResponse) {
          setTransactionSummaryResponse({
            ...transactionSummaryResponse,
            data: [...transactionSummaryResponse.data, summary],
          });
        }
        setSelectedDetail({ date: clickedDate, summary, open: true });
      } else {
        setSelectedDetail({
          date: clickedDate,
          summary: undefined,
          open: true,
        });
      }
    } catch (err) {
      console.error('❌ 일간 거래 요약 가져오기 실패:', err);
      setSelectedDetail({ date: clickedDate, summary: undefined, open: true });
    }
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  return (
    <>
      <Panel>
        <CalendarWithTransactions
          date={date}
          tileContentMap={calendarTileMap}
          onSelectDate={handleDateClick}
        />

        {selectedDetail && (
          <TransactionDetailView
            open={selectedDetail.open}
            date={selectedDetail.date}
            transactionSummary={selectedDetail.summary}
            onClose={() => setSelectedDetail(null)}
            onPrev={() =>
              setSelectedDetail((prev) =>
                prev ? { ...prev, date: addDays(prev.date, -1) } : null
              )
            }
            onNext={() =>
              setSelectedDetail((prev) =>
                prev ? { ...prev, date: addDays(prev.date, 1) } : null
              )
            }
          />
        )}
      </Panel>
    </>
  );
}
