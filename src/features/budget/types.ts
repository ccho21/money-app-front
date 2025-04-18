import { CategoryType } from '@/features/category/types';
import { RangeOption } from '@/features/shared/types';

//
// Budget entity (from DB)
//
export interface BudgetDTO {
  id: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

//
// Request DTOs for budget
//
export interface BudgetCreateRequestDTO {
  total: number;
}

export interface BudgetUpdateRequestDTO {
  total?: number;
}

//
// Budget per category - combined with category info
//
export interface BudgetCategoryItemDTO {
  categoryId: string;
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
  budgetId: string | null;
  amount: number;
  usedAmount?: number;
  rate?: number;
  startDate: string;
  endDate: string;
  isNew?: boolean;
}

//
// API response for list of budgeted categories
//
export interface BudgetCategoryListResponseDTO {
  total: number;
  data: BudgetCategoryItemDTO[];
}

//
// Update individual budget category inline
//
export interface UpdateBudgetCategoryDTO {
  amount?: number;
  startDate?: string;
  endDate?: string;
}

//
// Create a new budget category with group info
//
export interface CreateBudgetCategoryDTO {
  categoryId: string;
  amount: string | number;
  startDate: string;
  endDate: string;
  groupBy: RangeOption;
}

//
// Update an existing grouped budget category
//
export interface UpdateBudgetCategoryGroupDTO {
  amount: string;
  startDate: string;
  endDate: string;
  groupBy: RangeOption;
}

//
// Budget warning item (exceeded categories)
//
export interface BudgetAlertDTO {
  category: string;
  budget: number;
  spent: number;
  exceededBy: number;
}

//
// Grouped summary item by category
//
export interface BudgetCategoryGroupItem {
  label: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  isCurrent: boolean;
  categoryId?: string | null;
}

export interface BudgetCategoryGroupResponseDTO {
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  icon: string;
  color?: string;
  budgets: BudgetCategoryGroupItem[];
}

//
// Summary response DTO for budget statistics
//
export interface BudgetSummaryItemDTO {
  categoryId: string;
  categoryName: string;
  budgetAmount: number;
  usedAmount: number;
  rate: number;
}

export interface BudgetSummaryResponseDTO {
  totalBudget: number;
  totalExpense: number;
  rate: number;
  rangeStart: string;
  rangeEnd: string;
}
