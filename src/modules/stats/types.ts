// 파일: src/modules/stats/types.ts

import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '@/common/types';
import { CategoryType } from '../category/types';
import { TransactionGroupItemDTO } from '../transaction/types';

export type SortKey = 'note' | 'count' | 'amount';
export type SortDirection = 'asc' | 'desc';

//
// Query DTO
//

export interface StatsQuery {
  type: 'income' | 'expense';
  startDate: string;
  endDate: string;
  groupBy: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Group Item DTOs
export interface StatsBudgetGroupItemDTO extends BaseGroupItemDTO {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  rate: number;
  amount: number;
  hasBudget: boolean;
  budgetId?: string;
  budget: number;
  color: string;
  income: number;
}

export interface StatsCategoryGroupItemDTO extends BaseGroupItemDTO {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  color: string;
  amount: number;
  rate: number;
  budgetId?: string;
  budget?: number;
  budgetRate?: number;
}

export interface StatsNoteGroupItemDTO {
  note: string;
  type: CategoryType;
  count: number;
  amount: number;
  totalIncome: number;
  totalExpense: number;
  items: StatsNoteGroupPeriodDTO[];
}

// Period DTOs
// export interface StatsBudgetPeriodDTO extends BaseGroupItemDTO {
//   income: number;
//   expense: number;
//   budget: number;
//   remaining: number;
//   isOver: boolean;
//   isCurrent: boolean;
// }

// export interface StatsCategoryPeriodDTO extends BaseGroupItemDTO {
//   income: number;
//   expense: number;
//   isCurrent: boolean;
// }

export interface StatsNoteGroupPeriodDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

// Detail DTOs
export interface StatsBudgetDetailDTO {
  categoryId: string;
  categoryName: string;
  icon: string;
  color: string;
  type: CategoryType;
  totalExpense: number;
  totalBudget: number;
  totalRemaining: number;
  isOver: boolean;
  items: TransactionGroupItemDTO[];
}

export interface StatsCategoryDetailDTO {
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  icon: string;
  color: string;
  totalIncome: number;
  totalExpense: number;
  items: TransactionGroupItemDTO[];
}

export interface StatsNoteDetailDTO {
  note: string;
  totalIncome: number;
  totalExpense: number;
  items: TransactionGroupItemDTO[];
}

export interface StatsNotePeriodDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

// Summary DTOs
export type StatsBudgetSummaryDTO =
  BaseListSummaryResponseDTO<StatsBudgetGroupSummaryDTO>;
export type StatsCategorySummaryDTO =
  BaseListSummaryResponseDTO<StatsCategoryGroupSummaryDTO>;
export type StatsNoteSummaryDTO =
  BaseListSummaryResponseDTO<StatsNoteGroupSummaryDTO>;

export interface StatsBudgetGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  budgetAmount?: number;
  remaining?: number;
  isOver?: boolean;
  isCurrent: boolean;
}

export interface StatsCategoryGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

export interface StatsNoteGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}
