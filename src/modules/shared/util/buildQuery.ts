import { DateFilterParams } from '../../common/types';

export const buildQuery = (params: DateFilterParams): string => {
  const filteredParams: Record<string, string> = {};

  if (params.startDate) filteredParams.startDate = params.startDate;
  if (params.endDate) filteredParams.endDate = params.endDate;
  if (params.groupBy) filteredParams.groupBy = params.groupBy.toString();
  if (params.type) filteredParams.type = params.type.toString();

  return new URLSearchParams(filteredParams).toString();
};
