import {
  format,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addYears,
  addMonths,
  addWeeks,
  addDays,
} from 'date-fns';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(
  amount: number,
  locale = 'en-US',
  currency = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

type RangeUnit = 'year' | 'month' | 'week' | 'day' | 'custom';

interface DateRangeOptions {
  unit: RangeUnit;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}

export const getDateRange = (baseDate: Date, options: DateRangeOptions) => {
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
