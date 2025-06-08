// 파일: src/modules/account/api.ts

import { get, post, patch, del } from '@/modules/shared/common/api';
import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
  AccountDetailDTO,
  DeleteAccountResponse,
} from './types/types';
import type { DateFilterParams } from '@/modules/shared/common/types'; // ✅ 승인 필요
import { buildQuery } from '../shared/util/buildQuery_old';

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