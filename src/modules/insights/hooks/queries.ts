// hooks/hooks.ts

import {
  fetchInsightAlertAPI,
  fetchInsightBudgetAPI,
  fetchInsightPatternAPI,
  fetchInsightRecurringAPI,
} from '@/modules/insights/api';
import {
  BudgetInsightResponse,
  GenericInsightResponse,
  InsightQuery,
  PatternInsightResponse,
} from '@/modules/insights/types/types';
import { useQuery } from '@tanstack/react-query';

export const useInsightPattern = (params: InsightQuery) => {
  return useQuery<PatternInsightResponse>({
    queryKey: ['insight-pattern', params],
    queryFn: () => fetchInsightPatternAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  });
};

export const useInsightBudget = (params: InsightQuery) => {
  return useQuery<BudgetInsightResponse>({
    queryKey: ['insight-budget', params],
    queryFn: () => fetchInsightBudgetAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });
};

export const useInsightRecurring = (params: InsightQuery) => {
  return useQuery<GenericInsightResponse>({
    queryKey: ['insight-recurring', params],
    queryFn: () => fetchInsightRecurringAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });
};

export const useInsightAlerts = (params: InsightQuery) => {
  return useQuery<GenericInsightResponse>({
    queryKey: ['insight-alerts', params],
    queryFn: () => fetchInsightAlertAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });
};
