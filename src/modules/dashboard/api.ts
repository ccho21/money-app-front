// apis/fetchDashboardAPI.ts

import { get } from '@/modules/shared/common/api';
import { TransactionGroupQuery } from '../transaction/types/types';
import { buildTransactionQuery } from '../transaction/utils/buildTransactionQuery';
import { DashboardDTO } from './types';

export const fetchDashboardAPI = (params: TransactionGroupQuery) => {
  const query = buildTransactionQuery(params); // query string 생성
  return get<DashboardDTO>(`/dashboard?${query}`);
};
