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
import type { DateFilterParams } from '@/common/types';

// [GET] /stats/category
export const fetchStatsByCategory = (params: DateFilterParams) => {
  return get<StatsCategoryGroupItemDTO[]>(
    `/stats/category?${buildQuery(params)}`
  );
};

// [GET] /stats/budget
export const fetchStatsByBudget = (params: DateFilterParams) => {
  return get<StatsBudgetGroupItemDTO[]>(`/stats/budget?${buildQuery(params)}`);
};

// [GET] /stats/note
export const fetchStatsByNote = (params: DateFilterParams) => {
  return get<StatsNoteGroupItemDTO[]>(`/stats/note?${buildQuery(params)}`);
};

// [GET] /stats/category/:id
export const fetchStatsCategoryDetail = (
  id: string,
  params: DateFilterParams
) => {
  return get<StatsCategoryDetailDTO>(
    `/stats/category/${id}?${buildQuery(params)}`
  );
};

// [GET] /stats/budget/:id
export const fetchStatsBudgetDetail = (
  id: string,
  params: DateFilterParams
) => {
  return get<StatsBudgetDetailDTO>(`/stats/budget/${id}?${buildQuery(params)}`);
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
export const fetchStatsCategorySummary = (params: DateFilterParams) => {
  return get<StatsCategorySummaryDTO>(
    `/stats/category/summary?${buildQuery(params)}`
  );
};

// [GET] /stats/budget/summary
export const fetchStatsBudgetSummary = (params: DateFilterParams) => {
  return get<StatsBudgetSummaryDTO>(
    `/stats/budget/summary?${buildQuery(params)}`
  );
};

// [GET] /stats/note/summary
export const fetchStatsNoteSummary = (params: DateFilterParams) => {
  return get<StatsNoteSummaryDTO>(`/stats/note/summary?${buildQuery(params)}`);
};
