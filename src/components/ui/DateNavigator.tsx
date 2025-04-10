// 📄 src/components/common/DateNavigator.tsx
'use client';

import { memo, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useRouter } from 'next/navigation';
import { getDateLabelByRange, getNextDateByRange } from '@/lib/date.util';
import { useShallow } from 'zustand/react/shallow';

interface DateNavigatorProps {
  withTransactionType?: boolean;
}

function DateNavigatorBase({ withTransactionType }: DateNavigatorProps) {
  const router = useRouter();

  const { date, range, setDate, getSyncedURLFromState } = useDateFilterStore(
    useShallow((s) => ({
      date: s.state.date,
      range: s.state.range,
      setDate: s.actions.setDate,
      getSyncedURLFromState: s.actions.getSyncedURLFromState,
    }))
  );

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(date, diff, range);
      setDate(newDate);
      const syncedURL = getSyncedURLFromState(withTransactionType);
      router.replace(`${syncedURL}`);
    },
    [date, range, setDate, getSyncedURLFromState, router, withTransactionType]
  );

  const label = useMemo(() => getDateLabelByRange(date, range), [date, range]);

  return (
    <div className="flex items-center justify-between bg-surface border border-border px-5 py-3 text-md font-normal shadow-sm">
      {/* 왼쪽 이동 */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleChange(-1)}
          className="p-2 rounded-md text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 중앙 라벨 */}
      <span className="text-sm font-semibold text-foreground select-none">
        {label}
      </span>

      {/* 오른쪽 이동 */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleChange(1)}
          className="p-2 rounded-md text-muted hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const DateNavigator = memo(DateNavigatorBase);
export default DateNavigator;
