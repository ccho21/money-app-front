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

  // ✅ 상태 shallow 최적화
  const { date, range, setDate, getSyncedURLFromState } = useDateFilterStore(
    useShallow((s) => ({
      date: s.state.date,
      range: s.state.range,
      setDate: s.actions.setDate,
      getSyncedURLFromState: s.actions.getSyncedURLFromState,
    }))
  );

  console.log('### DATEA NAVIGATOM', range);

  // ✅ 다음/이전 날짜 계산 후 상태 변경 + URL replace
  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(date, diff, range);
      setDate(newDate);
      const syncedURL = getSyncedURLFromState(withTransactionType);
      router.replace(`${syncedURL}`);
    },
    [date, range, setDate, getSyncedURLFromState, router, withTransactionType]
  );

  // ✅ 날짜 라벨 캐싱
  const label = useMemo(() => getDateLabelByRange(date, range), [date, range]);

  return (
    <div className='flex justify-between items-center px-5 py-3 text-base font-normal'>
      {/* 왼쪽 이동 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(-1)}>
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* 라벨 */}
      <span className='text-base font-medium text-gray-900 dark:text-white'>
        {label}
      </span>

      {/* 오른쪽 이동 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(1)}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// ✅ memo 최종 적용
const DateNavigator = memo(DateNavigatorBase);
export default DateNavigator;
