// src/lib/date.util.ts
import { format } from 'date-fns-tz';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getMonth,
  getYear,
  parse,
  setDate,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { DateRangeOptions } from '@/modules/shared/common/types';
import { Timeframe } from '@/modules/transaction/types/types';

export const getDateRangeKey = (
  date: Date,
  options: DateRangeOptions
): string => {
  const { startDate, endDate } = getDateRange(date, options);
  return `${startDate}_${endDate}`;
};

export const getDateRange = (
  baseDate: Date,
  { unit, amount = 0 }: DateRangeOptions
) => {
  let start: Date, end: Date;

  switch (unit) {
    case 'yearly':
      start = startOfYear(baseDate);
      end = endOfYear(addYears(baseDate, amount));
      break;
    case 'monthly':
      start = startOfMonth(baseDate);
      end = endOfMonth(addMonths(baseDate, amount));
      break;
    case 'weekly':
      start = startOfWeek(baseDate, { weekStartsOn: 0 });
      end = endOfWeek(addWeeks(baseDate, amount), { weekStartsOn: 0 });
      break;
    case 'daily':
      start = startOfDay(baseDate);
      end = endOfDay(addDays(baseDate, amount));
      break;
    // case "custom":
    //   if (!end)
    //     throw new Error("End  is required for 'custom' unit");
    //   start = startOfDay(baseDate);
    //   end = endOfDay(end);
    //   break;
    default:
      throw new Error('Invalid unit');
  }

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

export function getNextDateByRange(
  inputDate: Date,
  diff: number,
  timeframe: Timeframe
): Date {
  const baseDate = startOfDay(inputDate);
  const dayOfMonth = getDate(baseDate);

  switch (timeframe) {
    case 'yearly': {
      return new Date(getYear(baseDate) + diff, getMonth(baseDate), dayOfMonth);
    }
    case 'monthly': {
      const moved = addMonths(baseDate, diff);
      const lastDay = endOfMonth(moved).getDate();
      const safeDay = Math.min(dayOfMonth, lastDay);
      return setDate(moved, safeDay);
    }
    case 'weekly':
      return addDays(baseDate, diff * 7);
    case 'daily':
      return addDays(baseDate, diff);
    default:
      return baseDate;
  }
}

// 🔹 YYYY / YYYY-MM / YYYY-MM-DD 지원 (Local 기준)
export const parseLocalDate = (dateStr: string): Date => {
  const formatStr = /^\d{4}$/.test(dateStr)
    ? 'yyyy'
    : /^\d{4}-\d{2}$/.test(dateStr)
    ? 'yyyy-MM'
    : /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? 'yyyy-MM-dd'
    : null;

  if (!formatStr) throw new Error(`Invalid date string: ${dateStr}`);
  return startOfDay(parse(dateStr, formatStr, new Date()));
};

/**
 * ex: 'YYYY-MM-DD', 'hh:mm a', 'yyyy/MM/dd HH:mm:ss'
 */
export const formatLocalDateString = (
  date: Date | string,
  pattern: string = 'yyyy-MM-dd'
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, pattern);
};
