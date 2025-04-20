'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';

import { useTransactionStore } from '@/modules/transaction/store';
import { useShallow } from 'zustand/react/shallow';

import { get } from '@/common/api';
import { fetchTransactionCalendar } from '@/modules/transaction/hooks';

import {
  TransactionGroupItemDTO,
  TransactionGroupSummaryDTO,
} from '@/modules/transaction/types';
import { formatDate } from '@/lib/date.util';
import CalendarWithTransactions from '../_components/CalendarWithTransactions';
import TransactionDetailView from '../_components/TransactionDetailView';
import Panel from '@/components/ui/check/Panel';

import { useFilterStore } from '@/stores/useFilterStore';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

//
// Calendar page: month view with per-day transaction summary
//
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

  const { query, setQuery, getDateRangeKey } = useFilterStore();
  const { date, groupBy } = query;

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date;
    summary?: TransactionGroupItemDTO;
    open: boolean;
  } | null>(null);

  //
  // Prepare map of income/expense for calendar tile display
  //
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
            <div className='text-primary'>
              +<CurrencyDisplay amount={item.income} />
            </div>
          )}
          {hasExpense && (
            <div className='text-error'>
              -<CurrencyDisplay amount={item.expense} />
            </div>
          )}
        </div>
      );
    });

    return map;
  }, [transactionCalendarItems]);

  //
  // Force groupBy to 'monthly' for calendar view
  //
  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  //
  // Fetch calendar data on month change
  //
  useEffect(() => {
    fetchTransactionCalendar(formatDate(date));
  }, [date]);

  //
  // Handle date click → fetch summary if not already cached
  //
  const handleDateClick = async (clickedDate: Date) => {
    const dateStr = formatDate(clickedDate);

    const fromStore = transactionSummaryResponse?.items.find(
      (g) => g.label === dateStr
    );
    if (fromStore) {
      setSelectedDetail({ date: clickedDate, summary: fromStore, open: true });
      return;
    }

    try {
      const [startDate, endDate] = getDateRangeKey().split('_');
      const params = new URLSearchParams({
        groupBy: 'daily',
        startDate,
        endDate,
      });

      const res = await get<TransactionGroupSummaryDTO>(
        `/transactions/summary?${params.toString()}`
      );

      const summary = res.items?.find((s) => s.label === dateStr);
      if (summary) {
        if (transactionSummaryResponse) {
          setTransactionSummaryResponse({
            ...transactionSummaryResponse,
            items: [...transactionSummaryResponse.items, summary],
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
      console.error('Failed to fetch daily summary:', err);
      setSelectedDetail({
        date: clickedDate,
        summary: undefined,
        open: true,
      });
    }
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
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
  );
}
