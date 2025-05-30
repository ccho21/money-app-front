import { get, post, put } from '@/modules/shared/common/api';
import type {
  BudgetCategoryListResponseDTO,
  BudgetCategoryItemDTO,
  BudgetCategoryCreateRequestDTO,
  BudgetCategoryUpdateRequestDTO,
  BudgetGroupItemDTO,
  BudgetSummaryDTO,
  BudgetQuery,
} from './types/types';
import type { DateFilterParams } from '@/modules/shared/common/types';
import { buildQuery } from './types/budgetBuildQuery';

// ✅ [GET] /budgets/by-category → 카테고리별 예산 항목 조회
export const fetchBudgetByCategoryAPI = (params: BudgetQuery) => {
  const query = buildQuery(params);
  return get<BudgetCategoryListResponseDTO>(`/budgets/by-category?${query}`);
};

// ✅ [POST] /budgets/by-category → 예산 항목 생성
export const createBudgetCategoryAPI = (
  payload: BudgetCategoryCreateRequestDTO
) => {
  return post<BudgetCategoryItemDTO, BudgetCategoryCreateRequestDTO>(
    '/budgets/by-category',
    payload
  );
};

// ✅ [PUT] /budgets/by-category/:id → 예산 항목 수정
export const updateBudgetCategoryAPI = (
  id: string,
  payload: BudgetCategoryUpdateRequestDTO
) => {
  return put<BudgetCategoryItemDTO, BudgetCategoryUpdateRequestDTO>(
    `/budgets/by-category/${id}`,
    payload
  );
};

// ✅ [GET] /budgets/by-category/:categoryId → 그룹 예산 조회
export const fetchGroupedBudgetCategoryAPI = (
  categoryId: string,
  params: BudgetQuery
) => {
  const query = buildQuery(params);
  return get<BudgetGroupItemDTO>(
    `/budgets/by-category/${categoryId}?${query}`,
  );
};

// ✅ [GET] /budgets/summary → 예산 요약
export const fetchBudgetSummaryAPI = (params: DateFilterParams) => {
  const query = buildQuery(params);
  return get<BudgetSummaryDTO>(`/budgets/summary?${query}`);
};
