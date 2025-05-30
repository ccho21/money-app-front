// apis/fetchInsightPatternAPI.ts

import { get } from '@/modules/shared/common/api';
import {
  BudgetInsightResponse,
  GenericInsightResponse,
  InsightQuery,
  PatternInsightResponse,
} from './types/types';
import { buildInsightQuery } from './util/buildInsightQuery';

export const fetchInsightPatternAPI = (params: InsightQuery) => {
  const query = buildInsightQuery(params);
  return get<PatternInsightResponse>(`/insights/pattern${query}`);
};

export const fetchInsightBudgetAPI = (params: InsightQuery) => {
  const query = buildInsightQuery(params);
  return get<BudgetInsightResponse>(`/insights/budget${query}`);
};

export const fetchInsightRecurringAPI = (params: InsightQuery) => {
  const query = buildInsightQuery(params);
  return get<GenericInsightResponse>(`/insights/recurring${query}`);
};

export const fetchInsightAlertAPI = (params: InsightQuery) => {
  const query = buildInsightQuery(params);
  return get<GenericInsightResponse>(`/insights/alerts${query}`);
};
