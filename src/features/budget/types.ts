import { CategoryType } from '@/features/category/types';
import {
  BaseGroupItemDTO,
  BaseListSummaryResponseDTO,
  RangeOption,
} from '@/features/shared/types';

export interface BudgetCategoryItemDTO {
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

export interface BudgetCategoryListResponseDTO {
  total: number;
  items: BudgetCategoryItemDTO[];
}

// ─────────────────────────────────────────────────────────
// ✅ Grouped Budget View (category-wise, for trend charts)
// ─────────────────────────────────────────────────────────

export interface BudgetCategoryPeriodItemDTO extends BaseGroupItemDTO {
  amount: number;
  used: number;
  remaining: number;
  isOver?: boolean;
  categoryId?: string;
  isCurrent: boolean;
  type: CategoryType;
}

export interface BudgetGroupItemDTO {
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

export interface BudgetSummaryResponseDTO
  extends BaseListSummaryResponseDTO<BudgetGroupItemDTO> {
  totalBudget?: number;
  rate?: number;
}

// ─────────────────────────────────────────────────────────
// ✅ Budget Create / Update DTOs
// ─────────────────────────────────────────────────────────

export interface CreateBudgetCategoryDTO {
  categoryId: string;
  amount: string | number;
  startDate: string;
  endDate: string;
  groupBy: RangeOption;
}

export interface UpdateBudgetCategoryDTO {
  amount?: number;
  startDate?: string;
  endDate?: string;
}

// Warning structure for overused budgets
export interface BudgetAlertDTO {
  category: string;
  budget: number;
  spent: number;
  exceededBy: number;
}
