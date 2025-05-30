import { BudgetQuery } from './types';

export const buildQuery = (params: BudgetQuery): string => {
  const filteredParams: Record<string, string> = {};

  if (params.startDate) filteredParams.startDate = params.startDate;
  if (params.endDate) filteredParams.endDate = params.endDate;
  if (params.timeframe) filteredParams.timeframe = params.timeframe.toString();
  return new URLSearchParams(filteredParams).toString();
};
