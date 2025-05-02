// src/app/stats/note/_components/NoteView.tsx
'use client';

import { useState, useMemo } from 'react';

import {
  SortKey,
  SortDirection,
  StatsNoteGroupItemDTO,
} from '@/modules/stats/types';

import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';

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
    return [...items].sort((a, b) => {
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

  if (isLoading) return <p className='p-component text-muted'>Loading...</p>;
  if (items.length === 0) return <EmptyMessage />;

  return (
    <div className='p-component space-y-4 bg-surface rounded-card'>
      <table className='w-full text-label text-left'>
        <thead className='text-muted border-b border-border'>
          <tr>
            <th
              className='py-element cursor-pointer'
              onClick={() => handleSort('note')}
            >
              Note {renderSortIcon('note')}
            </th>
            <th
              className='py-element text-center cursor-pointer'
              onClick={() => handleSort('count')}
            >
              Count {renderSortIcon('count')}
            </th>
            <th
              className='py-element text-right cursor-pointer'
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
              <td className='py-element'>{item.note || '-'}</td>
              <td className='py-element text-center'>{item.count}</td>
              <td className='py-element text-right'>
                <CurrencyDisplay amount={item.amount} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
