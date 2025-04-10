'use client';

import { memo, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilterStore } from '@/stores/useFilterStore';
import { useRouter } from 'next/navigation';
import { getDateLabelByRange, getNextDateByRange } from '@/lib/date.util';
import { useShallow } from 'zustand/react/shallow';

interface DateNavigatorProps {
  withTransactionType?: boolean;
}

function DateNavigatorBase({ withTransactionType }: DateNavigatorProps) {
  const router = useRouter();

  const { query, setQuery, getQueryString } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
      getQueryString: s.getQueryString,
    }))
  );

  const { date, range } = query;

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(date, diff, range);
      setQuery({ date: newDate });

      const syncedURL = getQueryString(withTransactionType);
      router.replace(`${syncedURL}`);
    },
    [date, range, setQuery, getQueryString, router, withTransactionType]
  );

  const label = useMemo(() => getDateLabelByRange(date, range), [date, range]);

  return (
    <div className='flex items-center justify-between bg-surface border border-border px-5 py-3 text-md font-normal shadow-sm'>
      {/* 왼쪽 이동 */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => handleChange(-1)}
          className='p-2 rounded-md text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          aria-label='Previous'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
      </div>

      {/* 중앙 라벨 */}
      <span className='text-sm font-semibold text-foreground select-none'>
        {label}
      </span>

      {/* 오른쪽 이동 */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => handleChange(1)}
          className='p-2 rounded-md text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          aria-label='Next'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}

const DateNavigator = memo(DateNavigatorBase);
export default DateNavigator;
