'use client';

import { useState, useMemo } from 'react';

import { CategoryType } from '@/modules/category/types';
import {
  SortKey,
  SortDirection,
  StatsNoteGroupItemDTO,
} from '@/modules/stats/types';

import EmptyMessage from '@/components/ui/check/EmptyMessage';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

interface NoteViewProps {
  transactionType: CategoryType;
  data: StatsNoteGroupItemDTO[];
  totalIncome: number;
  totalExpense: number;
  isLoading: boolean;
  onRowClick: (note: string) => void;
}

export default function NoteView({
  transactionType,
  data,
  totalIncome,
  totalExpense,
  isLoading,
  onRowClick,
}: NoteViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>('count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedList = useMemo(() => {
    return [...data].sort((a, b) => {
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
  }, [data, sortKey, sortDirection]);

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

  if (isLoading) return <p className="p-4 text-muted">Loading...</p>;
  if (data.length === 0) return <EmptyMessage />;

  const total = transactionType === 'income' ? totalIncome : totalExpense;

  return (
    <div className="p-4 space-y-4 bg-surface rounded-xl">
      {/* Header summary */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted">
          {transactionType === 'expense' ? 'Expense Notes' : 'Income Notes'}
        </span>
        <span
          className={`text-sm font-semibold ${
            transactionType === 'expense' ? 'text-error' : 'text-success'
          }`}
        >
          {transactionType === 'expense' ? 'Exp.' : 'Inc.'}{' '}
          <CurrencyDisplay amount={total} />
        </span>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead className="text-muted border-b border-border">
          <tr>
            <th className="py-2 cursor-pointer" onClick={() => handleSort('note')}>
              Note {renderSortIcon('note')}
            </th>
            <th className="py-2 text-center cursor-pointer" onClick={() => handleSort('count')}>
              Count {renderSortIcon('count')}
            </th>
            {/* <th className="py-2 text-right cursor-pointer" onClick={() => handleSort('balance')}>
              Amount {renderSortIcon('balance')}
            </th> */}
          </tr>
        </thead>
        <tbody className="text-foreground">
          {sortedList.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick(item.note || '')}
              className="border-b border-border hover:bg-muted/5 transition cursor-pointer"
            >
              <td className="py-2">{item.note || '-'}</td>
              <td className="py-2 text-center">{item.count}</td>
              <td className="py-2 text-right">
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
