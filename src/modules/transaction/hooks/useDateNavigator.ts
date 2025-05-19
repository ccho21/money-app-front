import { useMemo, useCallback } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import {
  getDateRangeKey,
  getNextDateByRange,
  parseLocalDate,
} from '@/lib/date.util';

interface UseDateNavigatorOptions {
  onRangeChange?: (start: string, end: string) => void;
}

export function useDateNavigator({ onRangeChange }: UseDateNavigatorOptions = {}) {
  const { startDate, timeframe } = useTransactionFilterStore((s) => s.query);
  const setQuery = useTransactionFilterStore((s) => s.setQuery);

  const parsedDate = useMemo(() => parseLocalDate(startDate), [startDate]);
  const label = useMemo(() => {
    switch (timeframe) {
      case 'daily':
        return format(parsedDate, 'yyyy-MM-dd');
      case 'weekly':
        const start = startOfWeek(parsedDate, { weekStartsOn: 1 });
        const end = endOfWeek(parsedDate, { weekStartsOn: 1 });
        return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
      case 'monthly':
      default:
        return format(parsedDate, 'yyyy-MMM');
    }
  }, [parsedDate, timeframe]);

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(parsedDate, diff, timeframe);
      const [start, end] = getDateRangeKey(newDate, { unit: timeframe }).split('_');
      setQuery({ startDate: start, endDate: end });
      onRangeChange?.(start, end);
    },
    [parsedDate, timeframe, setQuery, onRangeChange]
  );

  const handleSelect = useCallback(
    (selected: Date) => {
      const [start, end] = getDateRangeKey(selected, { unit: timeframe }).split('_');
      setQuery({ startDate: start, endDate: end });
      onRangeChange?.(start, end);
    },
    [timeframe, setQuery, onRangeChange]
  );

  return {
    parsedDate,
    timeframe,
    label,
    handleChange,
    handleSelect,
  };
}
