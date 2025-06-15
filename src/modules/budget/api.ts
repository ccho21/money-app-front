import { get, post, put } from '@/modules/shared/common/api';
import type {
  BudgetCategoryListResponse,
  BudgetCategoryItem,
  BudgetCategoryCreateRequest,
  BudgetCategoryUpdateRequest,
  BudgetGroupItem,
  BudgetQuery,
} from './types/types';
import { buildQuery } from './types/budgetBuildQuery';

// ✅ [GET] /budgets/by-category → 카테고리별 예산 항목 조회
export const fetchBudgetByCategoryAPI = (params: BudgetQuery) => {
  const query = buildQuery(params);
  return get<BudgetCategoryListResponse>(`/budgets/by-category?${query}`);
};

// ✅ [POST] /budgets/by-category → 예산 항목 생성
export const createBudgetCategoryAPI = (
  payload: BudgetCategoryCreateRequest
) => {
  return post<BudgetCategoryItem, BudgetCategoryCreateRequest>(
    '/budgets/by-category',
    payload
  );
};

// ✅ [PUT] /budgets/by-category/:id → 예산 항목 수정
export const updateBudgetCategoryAPI = (
  id: string,
  payload: BudgetCategoryUpdateRequest
) => {
  return put<BudgetCategoryItem, BudgetCategoryUpdateRequest>(
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
  return get<BudgetGroupItem>(`/budgets/by-category/${categoryId}?${query}`);
};
