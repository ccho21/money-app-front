import { CategoryType } from '../category/types';

export type StatsBudgetUsageParams = {
  type: CategoryType;
  startDate: string;
  endDate: string;
};
