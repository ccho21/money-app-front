import { CategoryType } from '@/features/category/types';
import {
  BaseGroupItemDTO,
  BaseListSummaryResponseDTO,
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

export interface BudgetDetailDTO {
  id: string;
  total: number;
  categoryIds: string[];
  createdAt: string;
  updatedAt: string;
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

export interface BudgetCategoryPeriodItemDTO extends BaseGroupItemDTO {
  amount: number;
  used: number;
  remaining: number;
  isOver?: boolean;
  categoryId?: string;
  isCurrent: boolean;
  type: CategoryType;
}

export interface BudgetCategoryCreateRequestDTO
  extends BaseBudgetCategoryRequestDTO {
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
  type: CategoryType;
}

export type BudgetCategoryUpdateRequestDTO =
  Partial<BudgetCategoryCreateRequestDTO>;

export interface BudgetGroupSummaryDTO
  extends BaseListSummaryResponseDTO<BudgetGroupItemDTO> {
  totalBudget?: number;
  rate?: number;
}

export interface BaseBudgetCategoryRequestDTO {
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
  type: CategoryType;
}
