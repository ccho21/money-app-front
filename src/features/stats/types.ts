import {
  BaseGroupItemDTO,
  BaseListSummaryResponseDTO,
} from '@/features/shared/types';

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

//
// CATEGORY
//

export interface StatsCategoryGroupItemDTO extends BaseGroupItemDTO {
  categoryId: string;
  categoryName: string;
  categoryType: 'income' | 'expense';
  color: string;
  amount: number;
  rate: number;
  budgetId?: string;
  budget?: number;
  budgetRate?: number;
}

export interface StatsCategoryGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

export type StatsCategorySummaryDTO =
  BaseListSummaryResponseDTO<StatsCategoryGroupSummaryDTO>;

export interface StatsCategoryPeriodDTO extends BaseGroupItemDTO {
  categoryId: string;
  categoryName: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
  income: number;
  expense: number;
  isCurrent: boolean;
  totalIncome: number;
  totalExpense: number;
  data: StatsCategoryPeriodDTO[];
}

//
// BUDGET
//

export interface StatsBudgetGroupItemDTO extends BaseGroupItemDTO {
  categoryId: string;
  categoryName: string;
  categoryType: 'income' | 'expense';
  icon: string;
  color: string;
  spent: number;
  income: number;
  budget: number;
  remaining: number;
  rate: number;
  hasBudget: boolean;
  budgetId?: string;
}

export interface StatsBudgetGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  budgetAmount?: number;
  remaining?: number;
  isOver?: boolean;
  isCurrent: boolean;
}

export type StatsBudgetSummaryDTO =
  BaseListSummaryResponseDTO<StatsBudgetGroupSummaryDTO>;

export interface StatsBudgetPeriodDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  budget: number;
  remaining: number;
  isOver: boolean;
  isCurrent: boolean;
  categoryId: string;
  categoryName: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  totalExpense: number;
  totalBudget: number;
  totalRemaining: number;
  data: StatsBudgetPeriodDTO[];
}

//
// NOTE
//

export interface StatsNoteGroupItemDTO {
  note: string;
  type: 'income' | 'expense';
  count: number;
  totalIncome: number;
  totalExpense: number;
  data: StatsNoteGroupPeriodDTO[];
}

export interface StatsNoteGroupPeriodDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

export interface StatsNoteGroupSummaryDTO extends BaseGroupItemDTO {
  income: number;
  expense: number;
  isCurrent: boolean;
}

export type StatsNoteSummaryDTO =
  BaseListSummaryResponseDTO<StatsNoteGroupSummaryDTO>;

export interface StatsNotePeriodDTO extends BaseGroupItemDTO {
  note: string;
  income: number;
  expense: number;
  isCurrent: boolean;
  totalIncome: number;
  totalExpense: number;
  data: StatsNotePeriodDTO[];
}

export interface StatsNoteDetailDTO {
  note: string;
  totalIncome: number;
  totalExpense: number;
  data: StatsNotePeriodDTO[];
}
