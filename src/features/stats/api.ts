import { get } from '@/features/shared/api';
import { DateFilterParams } from '../shared/types';
import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
  StatsSummaryByBudgetResponse,
  StatsSummaryByCategoryResponse,
} from './types';
import { TransactionSummaryResponse } from '../transaction/types';

export const fetchStatByCategoryAPI = (
  params: DateFilterParams
): Promise<StatsByCategoryResponse> => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  return get(`/stats/by-category?${query.toString()}`);
};

export const fetchStatByBudgetAPI = (
  params: DateFilterParams
): Promise<StatsByBudgetResponse> => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
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

export const fetchStatsCategoryByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/category/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
};

export const fetchStatBudgetByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(`/stats/budget/${categoryId}?${query.toString()}`);
  return res as Promise<TransactionSummaryResponse>;
};

export const fetchStatsSummaryByCategoryIdAPI = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(
    `/stats/category/${categoryId}/summary?${query.toString()}`
  );
  return res as Promise<StatsSummaryByCategoryResponse>;
};

export const fetchStatsSummaryByBudgetAPI = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);
  if (params.type) query.append('type', params.type);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  const res = await get(
    `/stats/budget/${categoryId}/summary?${query.toString()}`
  );
  return res as Promise<StatsSummaryByBudgetResponse>;
};
