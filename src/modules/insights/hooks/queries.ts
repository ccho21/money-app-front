// hooks/hooks.ts

import { fetchInsightBudgetAPI, fetchInsightPatternAPI } from '@/modules/insights/api';
import {
  BudgetInsightResponse,
  InsightQuery,
  PatternInsightResponse,
} from '@/modules/insights/types/types';
import { useQuery } from '@tanstack/react-query';

export const fetchInsightPattern = (params: InsightQuery) => {
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
