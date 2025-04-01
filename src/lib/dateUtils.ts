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
} from 'date-fns';

export const parseLocalDate = (dateStr: string): Date => {
  const parsed = parse(dateStr, 'yyyy-MM-dd', new Date()); // 🔥 Local midnight 기준 파싱
  return startOfDay(parsed); // 보정 + 안전
};

export type RangeOption = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

/**
 * 📅 기준 날짜(inputDate)에서 diff만큼 앞뒤로 이동된 날짜를 반환
 * 무조건 Local Time 기준으로 계산 (startOfDay 사용)
 */
export function getNextDateByRange(
  inputDate: Date,
  diff: number,
  range: RangeOption
): Date {
  const baseDate = startOfDay(inputDate); // ⬅️ 항상 로컬 기준 00:00시로 고정
  const dayOfMonth = getDate(baseDate); // ⬅️ 현재 날짜 (예: 31)

  switch (range) {
    case 'Yearly': {
      const year = getYear(baseDate) + diff;
      const month = getMonth(baseDate);
      return new Date(year, month, dayOfMonth); // ⬅️ 로컬 기준
    }

    case 'Monthly': {
      const safeBase = setDate(baseDate, 1); // ⬅️ 날짜 충돌 방지 (e.g. 31일)
      const movedMonth = addMonths(safeBase, diff); // ⬅️ 월 이동
      return setDate(movedMonth, dayOfMonth); // ⬅️ 원래 날짜 복원
    }

    case 'Weekly':
      return addDays(baseDate, diff * 7);

    case 'Daily':
      return addDays(baseDate, diff);

    default:
      return baseDate;
  }
}

type RangeUnit = 'year' | 'month' | 'week' | 'day' | 'custom';

interface DateRangeOptions {
  unit: RangeUnit;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}

const getDateRange = (baseDate: Date, options: DateRangeOptions) => {
  const { unit, amount = 0, customEndDate } = options;
  let start: Date, end: Date;

  switch (unit) {
    case 'year':
      start = startOfYear(baseDate);
      end = endOfYear(addYears(baseDate, amount));
      break;
    case 'month':
      start = startOfMonth(baseDate);
      end = endOfMonth(addMonths(baseDate, amount));
      break;
    case 'week':
      start = startOfWeek(baseDate, { weekStartsOn: 0 });
      end = endOfWeek(addWeeks(baseDate, amount), { weekStartsOn: 0 });
      break;
    case 'day':
      start = startOfDay(baseDate);
      end = endOfDay(addDays(baseDate, amount));
      break;
    case 'custom':
      if (!customEndDate) {
        throw new Error("customEndDate is required for 'custom' unit");
      }
      start = startOfDay(baseDate);
      end = endOfDay(customEndDate);
      break;
    default:
      throw new Error('Invalid unit');
  }
  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
};

export const getDateRangeKey = (
  date: Date,
  { unit, amount, customEndDate }: DateRangeOptions
): string => {
  const { startDate, endDate } = getDateRange(date, {
    unit,
    amount: amount || 0,
    customEndDate,
  });
  return `${startDate}_${endDate}`;
};

export function normalizeToLocalMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// 사용 예시
// // 1. 한 달 범위
// const monthlyRange = getDateRange(new Date(), { unit: "month" });
// console.log("Monthly Range:", monthlyRange);

// // 2. 1년 범위
// const yearlyRange = getDateRange(new Date(), { unit: "year" });
// console.log("Yearly Range:", yearlyRange);

// // 3. 2주 범위
// const biweeklyRange = getDateRange(new Date(), { unit: "week", amount: 2 });
// console.log("Biweekly Range:", biweeklyRange);

// // 4. 사용자 지정 범위 (예: baseDate부터 특정 날짜까지)
// const customRange = getDateRange(new Date(), {
//   unit: "custom",
//   customEndDate: new Date("2025-12-31"),
// });
