'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import { CategoryType } from '@/modules/category/types';

import SummaryBox from '@/components/stats/SummaryBox';
import TransactionGroup from '@/components/transaction/TransactionGroup';

import { fetchNoteDetail, fetchNoteSummary } from '@/modules/stats/hooks';
import Panel from '@/components/ui/check/Panel';
import ComposedChart from '@/components/ui/check/ComposedChart';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import { useShallow } from 'zustand/shallow';

export default function StatsNoteDetailPage() {
  const { note } = useParams();
  const router = useRouter();

  const { groupBy, transactionType } = useFilterStore((s) => s.query);
  const { getDateRangeKey, setQuery } = useFilterStore();
  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = useMemo(
    () => ({
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    }),
    [startDate, endDate, groupBy, transactionType]
  );

  const { noteSummary, noteDetail, isLoading, setLoading } = useStatsStore(
    useShallow((s) => ({
      noteSummary: s.noteSummary,
      noteDetail: s.noteDetail,
      isLoading: s.isLoading,
      setLoading: s.setLoading,
    }))
  );

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  useEffect(() => {
    const decodedNote =
      typeof note === 'string' ? decodeURIComponent(note) : '';
    const displayNote = decodedNote === '_' ? '비어있는 노트' : decodedNote;

    setTopNav({
      title: displayNote,
      onBack: () => router.back(),
    });

    return () => resetTopNav();
  }, [note, router, setTopNav, resetTopNav]);

  useEffect(() => {
    if (!note) return;
    const decodedNote = decodeURIComponent(String(note)) || '_';

    setLoading(true);
    Promise.all([
      fetchNoteSummary(decodedNote, params),
      fetchNoteDetail(decodedNote, params),
    ]).finally(() => setLoading(false));
  }, [note, params, setLoading]);

  const chartData = useMemo(() => {
    if (!noteSummary?.items) return [];
    return noteSummary.items.map((item) => ({
      month: item.label,
      startDate: item.rangeStart,
      endDate: item.rangeEnd,
      value: transactionType === 'expense' ? item.expense : item.income,
      isCurrent: item.isCurrent,
    }));
  }, [noteSummary, transactionType]);

  const summaryData = useMemo(() => {
    if (!noteSummary || !noteSummary.items.length) {
      return { income: 0, expense: 0, total: 0 };
    }

    const current = noteSummary.items.find((item) => item.isCurrent);
    if (!current) {
      return { income: 0, expense: 0, total: 0 };
    }
    return {
      income: current.income,
      expense: current.expense,
      total: current.income - current.expense,
    };
  }, [noteSummary]);

  const handleDateClick = (startDate: string) => {
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div className='space-y-4'>
      {/* 요약 정보 */}
      {noteSummary && (
        <Panel>
          <SummaryBox
            items={[
              {
                label: 'Income',
                value: summaryData.income,
                color: 'text-success',
                prefix: '$',
              },
              {
                label: 'Expense',
                value: summaryData.expense,
                color: 'text-error',
                prefix: '$',
              },
              {
                label: 'Total',
                value: summaryData.total,
                color: 'text-foreground',
                prefix: '$',
              },
            ]}
          />
        </Panel>
      )}

      {/* 차트 */}
      {chartData.length > 0 && (
        <Panel>
          <div className='w-full h-36'>
            <ComposedChart data={chartData} onSelect={handleDateClick} />
          </div>
        </Panel>
      )}

      {/* 거래 리스트 */}
      {noteDetail?.items.length ? (
        <Panel>
          <div className='space-y-4'>
            {noteDetail.items.map((group, i) => (
              <TransactionGroup
                key={group.label + i}
                label={group.label}
                rangeStart={group.rangeStart}
                rangeEnd={group.rangeEnd}
                groupIncome={group.groupIncome}
                groupExpense={group.groupExpense}
                group={group}
              />
            ))}
          </div>
        </Panel>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
