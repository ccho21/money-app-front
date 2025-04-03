import { CategoryType } from "../category/types";

export interface BaseDateFilterParams {
  startDate: string;
  endDate: string;
}

export type StatsParams = {
  type: CategoryType;
  startDate: string;
  endDate: string;
  groupBy?: RangeOption;
};

export type BudgetUsageParams = {
  startDate: string;
  endDate: string;
};

export type AccountTransactionSummaryParams = {
  startDate: string;
  endDate: string;
};

export type FetchTransactionSummaryParams = {
  groupBy: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
};

export type RangeOption = "daily" | "weekly" | "monthly" | "yearly";

export const RANGE_OPTIONS: RangeOption[] = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
];

export interface DateRangeOptions {
  unit: RangeOption;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}
