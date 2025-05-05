// src/app/stats/note/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchNoteStats } from '@/modules/stats/hooks';

import { CategoryType } from '@/modules/category/types';
import type { DateFilterParams } from '@/common/types';

import { useShallow } from 'zustand/shallow';
import dynamic from 'next/dynamic';
const NoteView = dynamic(
  () => import('@/app/stats/note/_components/NoteView'),
  {
    ssr: false,
  }
);

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

    (async () => {
      await fetchNoteStats(params);
    })();
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
