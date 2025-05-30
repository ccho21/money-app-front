import { BudgetQuery } from "@/modules/budget/types/types";

export const buildQuery = (params: BudgetQuery): string => {
  const filteredParams: Record<string, string> = {};

  if (params.startDate) filteredParams.startDate = params.startDate;
  if (params.endDate) filteredParams.endDate = params.endDate;
  if (params.timeframe) filteredParams.groupBy = params.timeframe.toString();

  return new URLSearchParams(filteredParams).toString();
};
