'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByNote } from '@/services/statsService';

import { TransactionType } from '@/features/transaction/types';
import { formatCurrency } from '@/lib/utils';
import EmptyMessage from '@/components/ui/EmptyMessage';

type SortKey = 'note' | 'count' | 'amount';
type SortDirection = 'asc' | 'desc';

export default function NoteView() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') || 'expense') as TransactionType;

  const { query, getDateRangeKey } = useFilterStore();
  const { date, range } = query;

  const {
    state: { noteResponse, isLoading },
  } = useStatsStore();

  const [sortKey, setSortKey] = useState<SortKey>('count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');

      await fetchStatsByNote({
        startDate,
        endDate,
        type: tab,
      });
    };

    run();
  }, [getDateRangeKey, tab]);

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
    tab === 'income'
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

  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;

  if (!noteResponse || rawList.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <div className='p-4 space-y-4 bg-surface rounded-xl'>
      {/* 상단 요약 */}
      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted'>
          {tab === 'expense' ? 'Expense Notes' : 'Income Notes'}
        </span>
        <span
          className={`text-sm font-semibold ${
            tab === 'expense' ? 'text-error' : 'text-success'
          }`}
        >
          {tab === 'expense' ? 'Exp.' : 'Inc.'} {formatCurrency(totalAmount)}
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
              className='border-b border-border hover:bg-muted/5 transition'
            >
              <td className='py-2'>{item.note || '-'}</td>
              <td className='py-2 text-center'>{item.count}</td>
              <td className='py-2 text-right'>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
