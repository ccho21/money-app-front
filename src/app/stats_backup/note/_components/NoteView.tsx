'use client';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components_backup/ui/table';

import { useState, useMemo } from 'react';
import {
  SortKey,
  SortDirection,
  StatsNoteGroupItemDTO,
} from '@/modules/stats/types';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';

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
    <div className='p-component bg-surface rounded-card'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className='w-[50%] cursor-pointer'
              onClick={() => handleSort('note')}
            >
              Note {renderSortIcon('note')}
            </TableHead>
            <TableHead
              className='text-center cursor-pointer'
              onClick={() => handleSort('count')}
            >
              Count {renderSortIcon('count')}
            </TableHead>
            <TableHead
              className='text-right cursor-pointer'
              onClick={() => handleSort('amount')}
            >
              Amount {renderSortIcon('amount')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedList.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(item.note || '')}
              className='hover:bg-muted/5 cursor-pointer'
            >
              <TableCell className='text-foreground'>
                {item.note || '-'}
              </TableCell>
              <TableCell className='text-center text-foreground'>
                {item.count}
              </TableCell>
              <TableCell className='text-right text-foreground'>
                <CurrencyDisplay amount={item.amount} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
