import { get } from '@/lib/api';
import { DateFilterParams } from '../shared/types';
import {
  StatsCategoryGroupItemDTO,
  StatsCategorySummaryDTO,
  StatsBudgetGroupItemDTO,
  StatsBudgetSummaryDTO,
  StatsNoteSummaryDTO,
  StatsCategoryPeriodDTO,
  StatsBudgetPeriodDTO,
  StatsNotePeriodDTO,
  StatsNoteGroupItemDTO,
} from './types';
import { BaseListSummaryResponseDTO } from '../shared/types';

function buildQuery(params: DateFilterParams): string {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  return query.toString();
}

//
// [GET] /stats/by-category
// Returns: grouped category stats
//
export const fetchStatByCategoryAPI = (
  params: DateFilterParams
): Promise<BaseListSummaryResponseDTO<StatsCategoryGroupItemDTO>> => {
  return get(`/stats/by-category?${buildQuery(params)}`);
};

//
// [GET] /stats/by-budget
// Returns: grouped budget stats
//
export const fetchStatByBudgetAPI = (
  params: DateFilterParams
): Promise<BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>> => {
  return get(`/stats/by-budget?${buildQuery(params)}`);
};

//
// [GET] /stats/by-note
// Returns: grouped note stats
//
export const fetchStatsByNoteAPI = (
  params: DateFilterParams
): Promise<BaseListSummaryResponseDTO<StatsNoteGroupItemDTO>> => {
  return get(`/stats/by-note?${buildQuery(params)}`);
};

//
// [GET] /stats/category/:categoryId
// Returns: category detail data
//
export const fetchStatsCategoryByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
): Promise<StatsCategoryPeriodDTO> => {
  return await get(`/stats/category/${categoryId}?${buildQuery(params)}`);
};

//
// [GET] /stats/budget/:categoryId
// Returns: budget detail data
//
export const fetchStatBudgetByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
): Promise<StatsBudgetPeriodDTO> => {
  return await get(`/stats/budget/${categoryId}?${buildQuery(params)}`);
};

//
// [GET] /stats/category/:categoryId/summary
// Returns: category summary
//
export const fetchStatsSummaryByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
): Promise<StatsCategorySummaryDTO> => {
  return await get(
    `/stats/category/${categoryId}/summary?${buildQuery(params)}`
  );
};

//
// [GET] /stats/budget/:categoryId/summary
// Returns: budget summary
//
export const fetchStatsSummaryByBudgetAPI = async (
  categoryId: string,
  params: DateFilterParams
): Promise<StatsBudgetSummaryDTO> => {
  return await get(`/stats/budget/${categoryId}/summary?${buildQuery(params)}`);
};

//
// [GET] /stats/note/:note
// Returns: note detail
//
export const fetchStatsNoteDetailAPI = async (
  note: string,
  params: DateFilterParams
): Promise<StatsNotePeriodDTO> => {
  return await get(
    `/stats/note/${encodeURIComponent(note)}?${buildQuery(params)}`
  );
};

//
// [GET] /stats/note/:note/summary
// Returns: note summary
//
export const fetchStatsSummaryByNoteAPI = async (
  note: string,
  params: DateFilterParams
): Promise<StatsNoteSummaryDTO> => {
  return await get(
    `/stats/note/${encodeURIComponent(note)}/summary?${buildQuery(params)}`
  );
};
