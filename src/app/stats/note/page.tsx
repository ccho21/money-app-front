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

  const { groupBy, transactionType } = query;

  const [startDate, endDate] = getDateRangeKey().split('_');

  const params: DateFilterParams = useMemo(
    () => ({
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    }),
    [startDate, endDate, groupBy, transactionType]
  );

  const { noteGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      noteGroup: s.noteGroup,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    if (!isInitialized) return;

    fetchNoteStats(params);
  }, [params]);

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
