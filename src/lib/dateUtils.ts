import { DateRangeOptions, RangeOption } from "@/features/shared/types";
import {
  addDays,
  addMonths,
  setDate,
  getDate,
  getMonth,
  getYear,
  startOfDay,
  parse,
  endOfDay,
  format,
  endOfWeek,
  startOfWeek,
  addWeeks,
  startOfYear,
  endOfYear,
  addYears,
  startOfMonth,
  endOfMonth,
} from "date-fns";



// 🔹 YYYY / YYYY-MM / YYYY-MM-DD 지원 (Local 기준)
export const parseLocalDate = (dateStr: string): Date => {
  const formatStr =
    /^\d{4}$/.test(dateStr)
      ? "yyyy"
      : /^\d{4}-\d{2}$/.test(dateStr)
      ? "yyyy-MM"
      : /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
      ? "yyyy-MM-dd"
      : null;

  if (!formatStr) throw new Error(`Invalid date string: ${dateStr}`);
  return startOfDay(parse(dateStr, formatStr, new Date()));
};

// 📅 기준 날짜(inputDate)에서 diff만큼 앞뒤로 이동된 날짜를 반환
export function getNextDateByRange(
  inputDate: Date,
  diff: number,
  range: RangeOption
): Date {
  const baseDate = startOfDay(inputDate);
  const dayOfMonth = getDate(baseDate);

  switch (range) {
    case "Yearly": {
      return new Date(getYear(baseDate) + diff, getMonth(baseDate), dayOfMonth);
    }
    case "Monthly": {
      const safeBase = setDate(baseDate, 1);
      const movedMonth = addMonths(safeBase, diff);
      return setDate(movedMonth, dayOfMonth);
    }
    case "Weekly":
      return addDays(baseDate, diff * 7);
    case "Daily":
      return addDays(baseDate, diff);
    default:
      return baseDate;
  }
}

export const getDateRange = (
  baseDate: Date,
  { unit, amount = 0, customEndDate }: DateRangeOptions
) => {
  let start: Date, end: Date;

  switch (unit) {
    case "Yearly":
      start = startOfYear(baseDate);
      end = endOfYear(addYears(baseDate, amount));
      break;
    case "Monthly":
      start = startOfMonth(baseDate);
      end = endOfMonth(addMonths(baseDate, amount));
      break;
    case "Weekly":
      start = startOfWeek(baseDate, { weekStartsOn: 0 });
      end = endOfWeek(addWeeks(baseDate, amount), { weekStartsOn: 0 });
      break;
    case "Daily":
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
      throw new Error("Invalid unit");
  }

  return {
    startDate: format(start, "yyyy-MM-dd"),
    endDate: format(end, "yyyy-MM-dd"),
  };
};

export const getDateRangeKey = (
  date: Date,
  options: DateRangeOptions
): string => {
  const { startDate, endDate } = getDateRange(date, options);
  return `${startDate}_${endDate}`;
};

export const normalizeToLocalMidnight = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getDateLabelByRange = (date: Date, range: RangeOption): string => {
  switch (range) {
    case "Yearly":
      return format(date, "yyyy");
    case "Monthly":
      return format(date, "MMM yyyy");
    case "Weekly": {
      const start = startOfWeek(date, { weekStartsOn: 0 });
      const end = endOfWeek(date, { weekStartsOn: 0 });
      return `${format(start, "MMM d")} ~ ${format(end, "MMM d, yyyy")}`;
    }
    case "Daily":
      return format(date, "yyyy.MM.dd (EEE)");
    default:
      return format(date, "yyyy.MM.dd");
  }
};

export const getStepByRange = (range: RangeOption): number => {
  switch (range) {
    case "Yearly":
      return 10;
    case "Monthly":
      return 12;
    default:
      return 1;
  }
};
