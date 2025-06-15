import { useMemo, useCallback } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import {
  getDateRangeKey,
  getNextDateByRange,
  parseLocalDate,
} from '@/modules/shared/util/date.util';
import { Timeframe, TransactionGroupQuery } from '../types/types';

interface UseDateNavigatorOptions {
  onRangeChange?: (start: string, end: string) => void;
}

export function useDateNavigator({
  onRangeChange,
}: UseDateNavigatorOptions = {}) {
  const startDate = useTransactionFilterStore((s) => s.query.startDate);
  const endDate = useTransactionFilterStore((s) => s.query.endDate);
  const timeframe = useTransactionFilterStore((s) => s.query.timeframe);
  const setQuery = useTransactionFilterStore((s) => s.setQuery);

  const parsedDate = useMemo(() => parseLocalDate(startDate), [startDate]);

  const label = useMemo(() => {
    switch (timeframe) {
      case 'daily':
        return format(parsedDate, 'yyyy-MM-dd');
      case 'weekly': {
        const start = startOfWeek(parsedDate, { weekStartsOn: 1 });
        const end = endOfWeek(parsedDate, { weekStartsOn: 1 });
        return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
      }
      case 'monthly':
        return format(parsedDate, 'MMMM yyyy');
      case 'yearly':
        return format(parsedDate, 'yyyy');
      case 'custom':
        return 'Custom Range';
      default:
        return 'Unknown';
    }
  }, [parsedDate, timeframe]);

  const updateQueryIfChanged = useCallback(
    (start: string, end: string) => {
      setQuery((prev) => {
        const patch: Partial<TransactionGroupQuery> = {};
        if (prev.startDate !== start) patch.startDate = start;
        if (prev.endDate !== end) patch.endDate = end;
        return Object.keys(patch).length > 0 ? patch : {};
      });

      if (start !== startDate || end !== endDate) {
        onRangeChange?.(start, end);
      }
    },
    [startDate, endDate, setQuery, onRangeChange]
  );

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(parsedDate, diff, timeframe);
      const [start, end] = getDateRangeKey(newDate, { unit: timeframe }).split(
        '_'
      );
      updateQueryIfChanged(start, end);
    },
    [parsedDate, timeframe, updateQueryIfChanged]
  );

  const handleSelect = useCallback(
    (selected: Date, overrideUnit?: Timeframe) => {
      const unit = overrideUnit ?? timeframe;
      const [start, end] = getDateRangeKey(selected, { unit }).split('_');
      updateQueryIfChanged(start, end);
    },
    [timeframe, updateQueryIfChanged]
  );

  return {
    parsedDate,
    timeframe,
    label,
    handleChange,
    handleSelect,
  };
}
