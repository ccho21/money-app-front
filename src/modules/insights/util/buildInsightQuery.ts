import { InsightQuery } from "../types/types";

export const buildInsightQuery = (params: InsightQuery): string => {
  const search = new URLSearchParams();
  search.set('startDate', params.startDate);
  search.set('endDate', params.endDate);
  search.set('timeframe', params.timeframe);
  return `?${search.toString()}`;
};