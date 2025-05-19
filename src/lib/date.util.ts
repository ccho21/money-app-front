// src/lib/date.util.ts
import { toZonedTime, fromZonedTime, format } from 'date-fns-tz';
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
  parseISO,
  setDate,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { DateRangeOptions, GroupBy } from '@/common/types';
import { Timeframe } from '@/modules/transaction/types/types';

// ✅ 사용자 브라우저 기준 timezone 자동 감지
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * UTC → 로컬 시간 (Date 객체 반환)
 */
export function fromUTCToLocal(utcDate: string | Date): Date {
  return toZonedTime(utcDate, timezone);
}

/**
 * 로컬 시간 → UTC 변환 (서버 전송용)
 */
export function fromLocalToUTC(localDate: string | Date): Date {
  return fromZonedTime(localDate, timezone);
}

/**
 * YYYY-MM-DD 문자열 → 로컬 00:00:00 으로 만든 후 UTC로 변환
 */
export function localStartOfDayToUTC(dateStr: string): Date {
  const localStart = startOfDay(parseISO(dateStr));
  return fromZonedTime(localStart, timezone);
}

/**
 * 날짜를 로컬 기준으로 포맷 문자열로 반환
 */
export function formatLocalDate(
  date: Date,
  fmt = 'yyyy-MM-dd HH:mm:ssXXX'
): string {
  return format(toZonedTime(date, timezone), fmt, { timeZone: timezone });
}

export const formatDate = (date: Date, fmt: string = 'yyyy-MM-dd'): string => {
  return format(date, fmt);
};

export function getDayAndWeekdayFromUTC(utcDate: string | Date) {
  const localDate = fromUTCToLocal(utcDate);
  const day = localDate.getDate();
  const weekday = localDate.toLocaleDateString('en-US', { weekday: 'short' });
  return { day, weekday };
}

export function isSameLocalDate(date1: Date, date2: Date): boolean {
  return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
}

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
    // case "Custom":
    //   if (!customEndDate)
    //     throw new Error("customEndDate is required for 'custom' unit");
    //   start = startOfDay(baseDate);
    //   end = endOfDay(customEndDate);
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
      const safeBase = setDate(baseDate, 1);
      const movedMonth = addMonths(safeBase, diff);
      return setDate(movedMonth, dayOfMonth);
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

export const normalizeToLocalMidnight = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getDateLabelByRange = (date: Date, groupBy: GroupBy): string => {
  switch (groupBy) {
    case 'yearly':
      return format(date, 'yyyy');
    case 'monthly':
      return format(date, 'MMM yyyy');
    case 'weekly': {
      const start = startOfWeek(date, { weekStartsOn: 0 });
      const end = endOfWeek(date, { weekStartsOn: 0 });
      return `${format(start, 'MMM d')} ~ ${format(end, 'MMM d, yyyy')}`;
    }
    case 'daily':
      return format(date, 'yyyy.MM.dd (EEE)');
    default:
      return format(date, 'yyyy.MM.dd');
  }
};

export const getStepByRange = (groupBy: GroupBy): number => {
  switch (groupBy) {
    case 'yearly':
      return 10;
    case 'monthly':
      return 12;
    default:
      return 1;
  }
};
