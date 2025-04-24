import { CategoryType } from '@/modules/category/types';

export type GroupBy = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const RANGE_OPTIONS: GroupBy[] = [
  'daily',
  'weekly',
  'monthly',
  'yearly',
];

export interface BaseGroupItemDTO {
  label: string;
  rangeStart: string;
  rangeEnd: string;
}

export interface BaseListSummaryResponseDTO<T> {
  startDate?: string;
  endDate?: string;
  groupBy: 'daily' | 'weekly' | 'monthly' | 'yearly';
  type?: 'income' | 'expense';
  summary?: T;
  items: T[];
  totalIncome?: number;
  totalExpense?: number;
}

export interface DateFilterParams {
  startDate: string;
  endDate: string;
  groupBy?: GroupBy;
  type?: CategoryType; // ✅ Only needed in stats-related contexts
}

export interface DateRangeOptions {
  unit: GroupBy;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}

export type SummaryItem = {
  label: string;
  value: number;
  color?: string; // 커스텀 텍스트 색상
  prefix?: string;
  suffix?: string;
};
