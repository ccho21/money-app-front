import { CategoryType } from '../../category/types/types';
import { Timeframe } from '../../transaction/types/types';

// 📌 공통
export interface BudgetQuery {
  startDate: string;
  endDate: string;
  timeframe?: Timeframe;
}

// 📌 응답: 카테고리별 예산 리스트
export interface BudgetCategoryItem {
  categoryId: string;
  categoryName: string;
  icon: string;
  color?: string;
  amount: number;
  used: number;
  remaining: number;
  isOver: boolean;
  type: CategoryType;
  budgetId?: string;
}

export interface BudgetCategoryListResponse {
  total: number;
  items: BudgetCategoryItem[];
}

// 📌 응답: 단일 카테고리 그룹 예산
export interface BudgetGroupItem {
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  icon: string;
  color?: string;
  totalBudget: number;
  totalUsed: number;
  totalRemaining: number;
  isOver: boolean;
  budgets: BudgetCategoryPeriodItemDTO[];
}

export interface BudgetCategoryPeriodItemDTO {
  label: string;
  rangeStart: string;
  rangeEnd: string;
  categoryId: string;
  amount: number;
  used: number;
  remaining: number;
  isCurrent: boolean;
  type: CategoryType;
  isOver?: boolean;
  budgetId?: string;
  isUnconfigured: boolean;
}

// 📌 요청: 예산 생성/수정
export interface BudgetCategoryCreateRequest {
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export type BudgetCategoryUpdateRequest = Partial<
  Omit<BudgetCategoryCreateRequest, 'categoryId'>
>;
