import { CategoryType } from '../category/types';
export type RangeOption = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const RANGE_OPTIONS: RangeOption[] = [
  'daily',
  'weekly',
  'monthly',
  'yearly',
];

export interface DateFilterParams {
  startDate: string;
  endDate: string;
  groupBy?: RangeOption;
  type?: CategoryType; // ✅ Only needed in stats-related contexts
}

export interface DateRangeOptions {
  unit: RangeOption;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}
