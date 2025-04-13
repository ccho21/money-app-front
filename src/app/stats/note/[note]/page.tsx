'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseISO, startOfDay } from 'date-fns';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';

import { CategoryType } from '@/features/category/types';

import Panel from '@/components/ui/Panel';
import SummaryBox from '@/components/stats/SummaryBox';
import ComposedChart from '@/components/ui/ComposedChart';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import EmptyMessage from '@/components/ui/EmptyMessage';
import {
  fetchStatsNoteDetail,
  fetchStatsSummaryByNote,
} from '@/features/stats/hooks';

export default function StatsNoteDetailPage() {
  const { note } = useParams();
  const router = useRouter();

  const {
    state: { noteSummaryResponse, noteDetailResponse, isLoading },
    actions: { setLoading },
  } = useStatsStore();

  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { range, transactionType, date } = query;

  const setTopNav = useUIStore((s) => s.setTopNav);
  const resetTopNav = useUIStore((s) => s.resetTopNav);

  // const rangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);

  const chartData = useMemo(() => {
    if (!noteSummaryResponse) return [];
    return noteSummaryResponse.data.map((summary) => ({
      month: summary.label,
      startDate: summary.startDate,
      endDate: summary.endDate,
      value: transactionType === 'expense' ? summary.expense : summary.income,
      isCurrent: summary.isCurrent,
    }));
  }, [noteSummaryResponse, transactionType]);

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

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params = {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy: range,
    };

    const decodedNote = decodeURIComponent(String(note));
    const finalNote = decodedNote === '' ? '_' : decodedNote;

    setLoading(true);
    Promise.all([
      fetchStatsSummaryByNote(finalNote, params),
      fetchStatsNoteDetail(finalNote, params),
    ]).finally(() => setLoading(false));
  }, [note, transactionType, range, setLoading, date, getDateRangeKey]);

  const handleDateClick = (startDate: string) => {
    console.log('### STARTDTATE', startDate);
    setQuery({ date: startOfDay(parseISO(startDate)) });
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  return (
    <div>
      {/* 요약 정보 */}
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: noteSummaryResponse?.totalIncome ?? 0,
              color: 'text-success',
              prefix: '$',
            },
            {
              label: 'Expense',
              value: noteSummaryResponse?.totalExpense ?? 0,
              color: 'text-error',
              prefix: '$',
            },
          ]}
        />
      </Panel>

      {/* 차트 */}
      {chartData.length > 0 && (
        <Panel>
          <div className='w-full h-36'>
            <ComposedChart
              data={chartData}
              onSelect={(startDate) => handleDateClick(startDate)}
            />
          </div>
        </Panel>
      )}

      {/* 거래 리스트 */}
      {noteDetailResponse?.data.length ? (
        <Panel>
          <div className='space-y-4'>
            {noteDetailResponse.data.map((group, i) => (
              <TransactionGroup
                key={group.label + i}
                label={group.label}
                rangeStart={group.rangeStart}
                rangeEnd={group.rangeEnd}
                incomeTotal={group.incomeTotal}
                expenseTotal={group.expenseTotal}
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
