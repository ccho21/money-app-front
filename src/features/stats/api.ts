import { get } from '@/features/shared/api';
import { StatsParams } from '../shared/types';
import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
} from './types';
import { TransactionSummaryResponse } from '../transaction/types';

export const fetchStatsByCategoryAPI = (
  params: StatsParams
): Promise<StatsByCategoryResponse> => {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-category?${query.toString()}`);
};

export const fetchStatsByBudgetAPI = (
  params: StatsParams
): Promise<StatsByBudgetResponse> => {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-budget?${query.toString()}`);
};

export const fetchStatsByNoteAPI = (
  params: StatsParams
): Promise<StatsByNoteResponse> => {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-note?${query.toString()}`);
};

export async function fetchStatCategoryByCategoryIdAPI(
  categoryId: string,
  params: StatsParams
) {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/category/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
}

export async function fetchStatBudgetByCategoryIdAPI(
  categoryId: string,
  params: StatsParams
) {
  const query = new URLSearchParams();
  query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/budget/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
}