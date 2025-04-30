'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchNoteStats } from '@/modules/stats/hooks';

import { CategoryType } from '@/modules/category/types';
import type { DateFilterParams } from '@/common/types';

import NoteView from '../components/NoteView';
import { useShallow } from 'zustand/shallow';

export default function StatsNotePage() {
  const router = useRouter();
  const { query, getDateRangeKey, isInitialized } = useFilterStore();

  const { groupBy, transactionType, date } = query;

  const { noteGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      noteGroup: s.noteGroup,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };

    fetchNoteStats(params);
  }, [date, groupBy, transactionType, getDateRangeKey, isInitialized]);

  const handleRowClick = (note: string) => {
    router.push(`/stats/note/${encodeURIComponent(note || '_')}`);
  };

  return (
    <NoteView
      items={noteGroup?.items ?? []}
      isLoading={isLoading}
      onRowClick={handleRowClick}
    />
  );
}
