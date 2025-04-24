// 파일: src/modules/stats/api.ts

import { get } from '@/common/api';
import { buildQuery } from '@/shared/util/buildQuery';
import {
  StatsCategoryGroupItemDTO,
  StatsCategorySummaryDTO,
  StatsCategoryDetailDTO,
  StatsBudgetGroupItemDTO,
  StatsBudgetSummaryDTO,
  StatsBudgetDetailDTO,
  StatsNoteGroupItemDTO,
  StatsNoteSummaryDTO,
  StatsNoteDetailDTO,
} from './types';
import type {
  BaseListSummaryResponseDTO,
  DateFilterParams,
} from '@/common/types';

// [GET] /stats/category
export const fetchStatsByCategory = (params: DateFilterParams) => {
  return get<BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO>>(
    `/stats/by-category?${buildQuery(params)}`
  );
};

// [GET] /stats/budget
export const fetchStatsByBudget = (params: DateFilterParams) => {
  return get<BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>>(
    `/stats/by-budget?${buildQuery(params)}`
  );
};

// [GET] /stats/note
export const fetchStatsByNote = (params: DateFilterParams) => {
  return get<BaseListSummaryResponseDTO<StatsNoteGroupItemDTO>>(
    `/stats/by-note?${buildQuery(params)}`
  );
};

// [GET] /stats/category/:id
export const fetchStatsCategoryDetail = (
  categoryId: string,
  params: DateFilterParams
) => {
  return get<StatsCategoryDetailDTO>(
    `/stats/category/${categoryId}?${buildQuery(params)}`
  );
};

// [GET] /stats/budget/:id
export const fetchStatsBudgetDetail = (
  categoryId: string,
  params: DateFilterParams
) => {
  return get<StatsBudgetDetailDTO>(`/stats/budget/${categoryId}?${buildQuery(params)}`);
};

// [GET] /stats/note/:note
export const fetchStatsNoteDetail = (
  note: string,
  params: DateFilterParams
) => {
  return get<StatsNoteDetailDTO>(
    `/stats/note/${encodeURIComponent(note)}?${buildQuery(params)}`
  );
};

// [GET] /stats/category/summary
export const fetchStatsCategorySummary = (
  categoryId: string,
  params: DateFilterParams
) => {
  return get<StatsCategorySummaryDTO>(
    `/stats/category/${categoryId}/summary?${buildQuery(params)}`
  );
};

// [GET] /stats/budget/summary
export const fetchStatsBudgetSummary = (
  categoryId: string,
  params: DateFilterParams
) => {
  return get<StatsBudgetSummaryDTO>(
    `/stats/budget/${categoryId}/summary?${buildQuery(params)}`
  );
};

// [GET] /stats/note/summary
export const fetchStatsNoteSummary = (
  categoryId: string,
  params: DateFilterParams
) => {
  return get<StatsNoteSummaryDTO>(
    `/stats/note/${categoryId}/summary?${buildQuery(params)}`
  );
};
