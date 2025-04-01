import { get } from '@/features/shared/api';
import { ExpenseStat, IncomeStat } from './types';

export const getExpenseStats = async (): Promise<ExpenseStat[]> => {
  return await get<ExpenseStat[]>('/stats/expense');
};

export const getIncomeStats = async (): Promise<IncomeStat[]> => {
  return await get<IncomeStat[]>('/stats/income');
};