import { get, patch, post } from '@/lib/api';
import {
  AccountCreateRequestDTO,
  AccountDTO,
  AccountTransactionSummaryDTO,
  AccountUpdateRequestDTO,
} from './types';
import { DateFilterParams } from '../shared/types';

export const createAccountAPI = (payload: AccountCreateRequestDTO) => {
  return post('/accounts', payload);
};

export const updateAccountAPI = (
  id: string,
  payload: AccountUpdateRequestDTO
) => {
  return patch(`/accounts/${id}`, payload);
};

export const fetchAccountsAPI = () => {
  return get<AccountDTO[]>('/accounts');
};

export const fetchAccountsByIdAPI = (id: string) => {
  return get<AccountDTO>(`/accounts/${id}`);
};

export const fetchAccountSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();

  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<AccountTransactionSummaryDTO[]>(
    `/accounts/summary?${query.toString()}`
  );
};

// export function fetchAccountSummaryByAccountIdAPI(paramsdc: DateFilterParams) {
//   const { accountId, ...params } = params;
//   const query = new URLSearchParams();

//   if (params.startDate) query.append('startDate', params.startDate);
//   if (params.endDate) query.append('endDate', params.endDate);
//   return post(`/account/${accountId}/summary`, dateFilter);
// }
