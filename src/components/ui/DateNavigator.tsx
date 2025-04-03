// 📄 src/components/ui/DateNavigator.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useRouter } from 'next/navigation';
import { getDateLabelByRange, getNextDateByRange } from '@/lib/dateUtils';

interface DateNavigatorProps {
  withTransactionType?: boolean;
}

export default function DateNavigator({
  withTransactionType,
}: DateNavigatorProps) {
  const {
    state: { date, range },
    actions: { setDate, getSyncedURLFromState },
  } = useDateFilterStore();

  const router = useRouter();

  const handleChange = (diff: number) => {
    const newDate = getNextDateByRange(date, diff, range);
    setDate(newDate);
    const syncedURL = getSyncedURLFromState(withTransactionType);
    router.replace(`${syncedURL}`);
  };

  const label = getDateLabelByRange(date, range);

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
