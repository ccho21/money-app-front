'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';

import { CategoryType } from '@/features/category/types';
import {
  SortKey,
  SortDirection,
  StatsNoteGroupItemDTO,
} from '@/features/stats/types';
import { fetchStatsByNote } from '@/features/stats/hooks';

import EmptyMessage from '@/components/ui/check/EmptyMessage';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

//
// Stats by note summary table view
//
export default function NoteView() {
  const router = useRouter();

  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy, transactionType } = query;
  const txType = transactionType as CategoryType;

  const noteResponse = useStatsStore((s) => s.state.noteResponse);
  const isLoading = useStatsStore((s) => s.state.isLoading);

  const [sortKey, setSortKey] = useState<SortKey>('count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  //
  // Build API params
  //
  const params = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return { startDate, endDate, type: txType, groupBy: groupBy };
  }, [getDateRangeKey, txType, groupBy]);

  //
  // Fetch on param change
  //
  useEffect(() => {
    fetchStatsByNote(params);
  }, [params]);

  //
  // Sorting logic
  //
  const rawList = useMemo(() => noteResponse?.items || [], [noteResponse]);

  const sortedList = useMemo(() => {
    return [...rawList].sort(
      (a: StatsNoteGroupItemDTO, b: StatsNoteGroupItemDTO) => {
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
      }
    );
  }, [rawList, sortKey, sortDirection]);

  const totalAmount =
    txType === 'income'
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

  //
  // Row click → navigate to detail page
  //
  const handleRowClick = useCallback(
    (note: string) => {
      router.push(`/stats/note/${encodeURIComponent(note || '_')}`);
    },
    [router]
  );

  //
  // Render loading or empty
  //
  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;
  if (!noteResponse || rawList.length === 0) return <EmptyMessage />;

  //
  // Render note table
  //
  return (
    <div className='p-4 space-y-4 bg-surface rounded-xl'>
      {/* Header summary */}
      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted'>
          {txType === 'expense' ? 'Expense Notes' : 'Income Notes'}
        </span>
        <span
          className={`text-sm font-semibold ${
            txType === 'expense' ? 'text-error' : 'text-success'
          }`}
        >
          {txType === 'expense' ? 'Exp.' : 'Inc.'}{' '}
          <CurrencyDisplay amount={totalAmount} />
        </span>
      </div>

      {/* Table */}
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
              className='border-b border-border hover:bg-muted/5 transition cursor-pointer'
            >
              <td className='py-2'>{item.note || '-'}</td>
              <td className='py-2 text-center'>{item.count}</td>
              <td className='py-2 text-right'>
                <CurrencyDisplay
                  amount={
                    txType === 'income' ? item.totalIncome : item.totalExpense
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
