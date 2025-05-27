// 파일: src/modules/account/api.ts

import { get, post, patch, del } from '@/modules/shared/common/api';
import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
  AccountDetailDTO,
  AccountTransactionSummaryDTO,
  AccountDashboardDTO,
  DeleteAccountResponse,
  // ⚠️ [외부 참조 필요] DateFilterParams는 shared/types 또는 common 모듈에서 가져와야 함
} from './types/types';
import type { DateFilterParams } from '@/modules/shared/common/types'; // ✅ 승인 필요
import { buildQuery } from '../shared/util/buildQuery';

// Create a new account
export const createAccountAPI = (payload: AccountCreateRequestDTO) => {
  return post<AccountDetailDTO, AccountCreateRequestDTO>('/accounts', payload);
};

// Update an existing account
export const updateAccountAPI = (
  id: string,
  payload: AccountUpdateRequestDTO
) => {
  return patch<AccountDetailDTO, AccountUpdateRequestDTO>(
    `/accounts/${id}`,
    payload
  );
};

// Update an existing account
export const deleteAccountAPI = (id: string) => {
  return del<DeleteAccountResponse>(`/accounts/${id}`);
};

// Fetch all accounts
export const fetchAccountsAPI = () => {
  return get<AccountDetailDTO[]>('/accounts');
};

// Fetch a single account by ID
export const fetchAccountByIdAPI = (id: string) => {
  return get<AccountDetailDTO>(`/accounts/${id}`);
};

// Fetch summarized transaction data per account
export const fetchAccountSummaryAPI = (params: DateFilterParams) => {
  const query = buildQuery(params);
  return get<AccountTransactionSummaryDTO>(`/accounts/summary?${query}`);
};

export const fetchAccountsDashboardAPI = (): Promise<AccountDashboardDTO> => {
  return get('/accounts/dashboard');
};
