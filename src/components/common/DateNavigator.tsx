// src/components/common/DateNavigator.tsx
'use client';

import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilterStore } from '@/stores/useFilterStore';
import { useRouter } from 'next/navigation';
import { getDateLabelByRange, getNextDateByRange } from '@/lib/date.util';
import { useShallow } from 'zustand/shallow';

interface DateNavigatorProps {
  withTransactionType?: boolean;
}

function DateNavigatorBase({ withTransactionType }: DateNavigatorProps) {
  const router = useRouter();

  const { date, groupBy } = useFilterStore(
    useShallow((s) => ({
      date: s.query.date,
      groupBy: s.query.groupBy,
    }))
  );

  const setQuery = useFilterStore((s) => s.setQuery);
  const getQueryString = useFilterStore((s) => s.getQueryString);

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(date, diff, groupBy);
      setQuery({ date: newDate });

      const syncedURL = getQueryString(withTransactionType);
      router.replace(syncedURL);
    },
    [date, groupBy, setQuery, getQueryString, router, withTransactionType]
  );

  const label = useFilterStore((s) =>
    getDateLabelByRange(s.query.date, s.query.groupBy)
  );

  return (
    <div className='flex items-center justify-between px-component py-tight text-body font-normal'>
      {/* 왼쪽 이동 */}
      <div className='flex items-center gap-element'>
        <button
          onClick={() => handleChange(-1)}
          className='p-compact rounded-input text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          aria-label='Previous'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
      </div>

      {/* 중앙 라벨 */}
      <span className='text-label font-semibold text-foreground select-none'>
        {label}
      </span>

      {/* 오른쪽 이동 */}
      <div className='flex items-center gap-element'>
        <button
          onClick={() => handleChange(1)}
          className='p-compact rounded-input text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          aria-label='Next'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}

export default DateNavigatorBase;
