import { get, patch, post } from '@/lib/api';
import {
  AccountCreateRequestDTO,
  AccountDetailDTO,
  AccountTransactionSummaryDTO,
  AccountUpdateRequestDTO,
} from './types';
import { DateFilterParams } from '../shared/types';

//
// Create a new account
//
export const createAccountAPI = (payload: AccountCreateRequestDTO) => {
  return post('/accounts', payload);
};

//
// Update an existing account
//
export const updateAccountAPI = (
  id: string,
  payload: AccountUpdateRequestDTO
) => {
  return patch(`/accounts/${id}`, payload);
};

//
// Fetch all accounts
//
export const fetchAccountsAPI = () => {
  return get<AccountDetailDTO[]>('/accounts');
};

//
// Fetch a single account by ID
//
export const fetchAccountsByIdAPI = (id: string) => {
  return get<AccountDetailDTO>(`/accounts/${id}`);
};

//
// Fetch summarized transaction data per account over a date groupBy
//
export const fetchAccountSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();

  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<AccountTransactionSummaryDTO>(
    `/accounts/summary?${query.toString()}`
  );
};

// TODO: Implement this if backend supports summary per account ID
// export function fetchAccountSummaryByAccountIdAPI(accountId: string, params: DateFilterParams) {
//   const query = new URLSearchParams();
//   if (params.startDate) query.append('startDate', params.startDate);
//   if (params.endDate) query.append('endDate', params.endDate);
//   return get<AccountTransactionSummaryDTO[]>(`/accounts/${accountId}/summary?${query.toString()}`);
// }
