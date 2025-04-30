'use client';

import { useState, useMemo } from 'react';

import {
  SortKey,
  SortDirection,
  StatsNoteGroupItemDTO,
} from '@/modules/stats/types';

import EmptyMessage from '@/components/ui/check/EmptyMessage';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

interface NoteViewProps {
  items: StatsNoteGroupItemDTO[];
  isLoading: boolean;
  onRowClick: (note: string) => void;
}

export default function NoteView({
  items,
  isLoading,
  onRowClick,
}: NoteViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>('count');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedList = useMemo(() => {
    return [...items].sort(
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
  }, [items, sortKey, sortDirection]);

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
  if (items.length === 0) return <EmptyMessage />;

  return (
    <div className='p-4 space-y-4 bg-surface rounded-xl'>
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
              onClick={() => onRowClick(item.note || '')}
              className='border-b border-border hover:bg-muted/5 transition cursor-pointer'
            >
              <td className='py-2'>{item.note || '-'}</td>
              <td className='py-2 text-center'>{item.count}</td>
              <td className='py-2 text-right'>
                <CurrencyDisplay amount={item.amount} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
