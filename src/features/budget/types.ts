import { CategoryType } from '@/features/category/types';
import { RangeOption } from '@/features/shared/types';

// ✅ 예산 전체 정보 (DB 기준)
export interface BudgetDTO {
  id: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

//
// ✅ 예산 생성/수정 요청 DTO
export interface BudgetCreateRequestDTO {
  total: number;
}

export interface BudgetUpdateRequestDTO {
  total?: number;
}

//
// ✅ 예산 카테고리 항목 DTO (카테고리별)
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
// ✅ 카테고리 목록 응답 DTO
export interface BudgetCategoryListResponseDTO {
  total: number;
  data: BudgetCategoryItemDTO[];
}

//
// ✅ 카테고리 단건 수정 요청 DTO
export interface UpdateBudgetCategoryDTO {
  amount?: number;
  startDate?: string;
  endDate?: string;
}

//
// ✅ 카테고리 생성 DTO
export interface CreateBudgetCategoryDTO {
  categoryId: string;
  amount: string | number;
  startDate: string; // yyyy-MM-dd
  endDate: string;
  groupBy: RangeOption;
}

//
// ✅ 카테고리 수정 DTO
export interface UpdateBudgetCategoryGroupDTO {
  amount: string;
  startDate: string;
  endDate: string;
  groupBy: RangeOption;
}

//
// ✅ 예산 경고 (초과 감지)
export interface BudgetAlertDTO {
  category: string;
  budget: number;
  spent: number;
  exceededBy: number;
}

//
// ✅ 카테고리 그룹 요약 DTO
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
// ✅ 요약 DTO (서버 응답 DTO와 구조 동일)
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
