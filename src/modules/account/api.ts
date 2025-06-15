// 파일: src/modules/account/api.ts

import { get, post, patch, del } from '@/modules/shared/common/api';
import {
  AccountCreateRequest,
  AccountUpdateRequestDTO,
  AccountDetail,
  DeleteAccountResponse,
} from './types/types';

// Create a new account
export const createAccountAPI = (payload: AccountCreateRequest) => {
  return post<AccountDetail, AccountCreateRequest>('/accounts', payload);
};

// Update an existing account
export const updateAccountAPI = (
  id: string,
  payload: AccountUpdateRequestDTO
) => {
  return patch<AccountDetail, AccountUpdateRequestDTO>(
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
  return get<AccountDetail[]>('/accounts');
};

// Fetch a single account by ID
export const fetchAccountByIdAPI = (id: string) => {
  return get<AccountDetail>(`/accounts/${id}`);
};