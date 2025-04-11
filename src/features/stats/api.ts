import { get } from '@/features/shared/api';
import { DateFilterParams } from '../shared/types';
import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
} from './types';
import { TransactionSummaryResponse } from '../transaction/types';

export const fetchStatsByCategoryAPI = (
  params: DateFilterParams
): Promise<StatsByCategoryResponse> => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-category?${query.toString()}`);
};

export const fetchStatsByBudgetAPI = (
  params: DateFilterParams
): Promise<StatsByBudgetResponse> => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-budget?${query.toString()}`);
};

export const fetchStatsByNoteAPI = (
  params: DateFilterParams
): Promise<StatsByNoteResponse> => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  return get(`/stats/by-note?${query.toString()}`);
};

export async function fetchStatCategoryByCategoryIdAPI(
  categoryId: string,
  params: DateFilterParams
) {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/category/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
}

export async function fetchStatBudgetByCategoryIdAPI(
  categoryId: string,
  params: DateFilterParams
) {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/budget/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
}
