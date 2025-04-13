'use client';

import { useEffect, useState, useMemo } from 'react';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';

import EmptyMessage from '@/components/ui/EmptyMessage';

import { CategoryType } from '@/features/category/types';
import { SortDirection, SortKey } from '@/features/stats/types';
import { fetchStatsByNote } from '@/services/statsService';
import { useRouter } from 'next/navigation';
import CurrencyDisplay from '@/components/ui/CurrencyDisplay';

export default function NoteView() {
  const router = useRouter();

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  const {
    state: { noteResponse, isLoading },
  } = useStatsStore();

  const [sortKey, setSortKey] = useState<SortKey>('count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    (async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');

      await fetchStatsByNote({
        startDate,
        endDate,
        type: transactionType as CategoryType,
        groupBy: range,
      });
    })();
  }, [getDateRangeKey, range, transactionType, date]);

  const rawList = useMemo(() => noteResponse?.data || [], [noteResponse]);

  const sortedList = useMemo(() => {
    return [...rawList].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = (aVal || '').toString().toLowerCase();
      const bStr = (bVal || '').toString().toLowerCase();
      return sortDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [rawList, sortKey, sortDirection]);

  const totalAmount =
    transactionType === 'income'
      ? noteResponse?.totalIncome ?? 0
      : noteResponse?.totalExpense ?? 0;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (key !== sortKey) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleRowClick = (note: string) => {
    console.log('### note', note, note || '_');
    router.push(`/stats/note/${encodeURIComponent(note || '_')}`);
  };

  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;

  if (!noteResponse || rawList.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <div className='p-4 space-y-4 bg-surface rounded-xl'>
      {/* 상단 요약 */}
      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted'>
          {transactionType === 'expense' ? 'Expense Notes' : 'Income Notes'}
        </span>
        <span
          className={`text-sm font-semibold ${
            transactionType === 'expense' ? 'text-error' : 'text-success'
          }`}
        >
          {transactionType === 'expense' ? 'Exp.' : 'Inc.'}{' '}
          <CurrencyDisplay amount={totalAmount} />
        </span>
      </div>

      {/* 테이블 */}
      <table className='w-full text-sm text-left'>
        <thead className='text-muted border-b border-border'>
          <tr>
            <th
              className='py-2 cursor-pointer'
              onClick={() => handleSort('note')}
            >
              Note {renderSortIcon('note')}
            </th>
            <th
              className='py-2 text-center cursor-pointer'
              onClick={() => handleSort('count')}
            >
              Count {renderSortIcon('count')}
            </th>
            <th
              className='py-2 text-right cursor-pointer'
              onClick={() => handleSort('amount')}
            >
              Amount {renderSortIcon('amount')}
            </th>
          </tr>
        </thead>
        <tbody className='text-foreground'>
          {sortedList.map((item, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item.note || '')}
              className='border-b border-border hover:bg-muted/5 transition'
            >
              <td className='py-2'>{item.note || '-'}</td>
              <td className='py-2 text-center'>{item.count}</td>
              <td className='py-2 text-right'>
                <CurrencyDisplay
                  amount={
                    transactionType === 'income'
                      ? item.totalIncome
                      : item.totalExpense
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
