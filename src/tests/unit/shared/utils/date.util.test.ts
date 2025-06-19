// src/modules/shared/util/date.util.test.ts

import {
  formatLocalDateString,
  getDateRange,
  getDateRangeKey,
  getNextDateByRange,
  parseLocalDate,
} from '@/modules/shared/util/date.util';

describe('date.util', () => {
  const baseDate = new Date(2025, 0, 15); // 2025-01-15 local time 00:00:00

  describe('getDateRange', () => {
    it('returns daily range', () => {
      const result = getDateRange(baseDate, { unit: 'daily', amount: 2 });
      expect(result).toEqual({
        startDate: '2025-01-15',
        endDate: '2025-01-17',
      });
    });

    it('returns weekly range', () => {
      const result = getDateRange(baseDate, { unit: 'weekly', amount: 1 });
      expect(result.startDate).toBe('2025-01-12'); // Sunday
      expect(result.endDate).toBe('2025-01-25'); // Saturday + 1 week
    });

    it('throws on invalid unit', () => {
      // @ts-expect-error invalid unit
      expect(() => getDateRange(baseDate, { unit: 'invalid' })).toThrow(
        'Invalid unit'
      );
    });
  });

  describe('getDateRangeKey', () => {
    it('generates key from date range', () => {
      const result = getDateRangeKey(baseDate, { unit: 'monthly', amount: 0 });
      expect(result).toMatch(/^2025-01-01_2025-01-31$/);
    });
  });

  describe('getNextDateByRange', () => {
    it('returns next yearly date', () => {
      const result = getNextDateByRange(new Date(2025, 4, 15), 1, 'yearly'); // 5월 = 4
      expect(formatLocalDateString(result)).toBe('2026-05-15');
    });

    it('returns next monthly date safely', () => {
      const result = getNextDateByRange(new Date(2025, 0, 31), 1, 'monthly'); // 1월 31일
      expect(formatLocalDateString(result)).toBe('2025-02-28'); // 윤년
    });

    it('returns previous weekly date', () => {
      const result = getNextDateByRange(baseDate, -1, 'weekly'); // 2025-01-15 → 2025-01-08
      expect(formatLocalDateString(result)).toBe('2025-01-08');
    });
  });

  describe('parseLocalDate', () => {
    it('parses YYYY format', () => {
      const result = parseLocalDate('2025');
      expect(formatLocalDateString(result)).toBe('2025-01-01');
    });

    it('parses YYYY-MM format', () => {
      const result = parseLocalDate('2025-05');
      expect(formatLocalDateString(result)).toBe('2025-05-01');
    });

    it('parses YYYY-MM-DD format', () => {
      const result = parseLocalDate('2025-03-15');
      expect(formatLocalDateString(result)).toBe('2025-03-15');
    });

    it('throws on invalid format', () => {
      expect(() => parseLocalDate('24-03')).toThrow('Invalid date string');
    });
  });

  describe('formatLocalDateString', () => {
    const date = new Date(2025, 5, 13, 14, 30); // 2025-06-13 14:30 (로컬 기준)

    const testCases: {
      input: Date | string;
      pattern: string;
      expected: string;
    }[] = [
      { input: date, pattern: 'yyyy', expected: '2025' },
      { input: date, pattern: 'yyyy-MM', expected: '2025-06' },
      { input: date, pattern: 'yyyy-MM-dd', expected: '2025-06-13' },
      { input: date, pattern: 'HH:mm', expected: '14:30' },
      { input: date, pattern: 'hh:mm a', expected: '02:30 PM' },
      {
        input: '2025-06-13T14:30:00',
        pattern: 'yyyy-MM-dd',
        expected: '2025-06-13',
      },
      { input: '2025-06-13T14:30:00', pattern: 'HH:mm', expected: '14:30' },
    ];

    it.each(testCases)(
      'formats $input to $expected using pattern "$pattern"',
      ({ input, pattern, expected }) => {
        const result = formatLocalDateString(input, pattern);
        expect(result).toBe(expected);
      }
    );

    it('returns yyyy-MM-dd by default when no pattern is provided', () => {
      const result = formatLocalDateString(date);
      expect(result).toBe('2025-06-13');
    });
  });
});
