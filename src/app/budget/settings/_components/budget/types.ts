import { CategoryType } from "@/features/category/types";
import { RangeOption } from "@/features/shared/types";

export interface BudgetAlert {
  category: string;
  budget: number;
  spent: number;
  exceededBy: number;
}

export interface Budget {
  id: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  // 관계 맵핑 시 필요한 필드는 상황에 따라 추가 (예: categories 등)
}

export interface CreateBudgetDto {
  total: number;
  // 카테고리, 메모 등 추가 필드 필요 시 확장
}

export interface UpdateBudgetDto {
  total?: number;
  // 다른 필드들(예: categoryId 등)도 선택적으로 업데이트 가능
}

export interface BudgetSummary {
  categoryId: string;
  categoryName: string;
  budgetAmount: number;
  usedAmount: number;
  rate: number;
}
export interface BudgetSummaryResponse {
  totalBudget: number;
  totalExpense: number;
  rate: number;
  data: BudgetSummary[];
}

// src/features/budget/types.ts

export interface BudgetCategory {
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  icon: string;
  color?: string;
  budgetId: string | null;
  budgetAmount: number;
  startDate: string;
  endDate: string;
  isNew: boolean;
}

export interface BudgetCategoryResponse {
  total: number;
  data: BudgetCategory[];
}

export interface UpdateBudgetCategoryPayload {
  amount?: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateBudgetCategoryResponse {
  budgetId: string;
  message: string;
}

export interface CreateBudgetCategory {
  categoryId: string;
  amount: string;
  startDate: string; // yyyy-MM-dd
  endDate: string;
  groupBy: RangeOption;
}

export interface UpdateBudgetCategory {
  amount: string;
  startDate: string; // yyyy-MM-dd
  endDate: string;
  groupBy: RangeOption;
}
