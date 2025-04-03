import { get, patch, post } from '@/features/shared/api';
import {
  Account,
  AccountTransactionSummaryDto,
  SubmitAccountPayload,
} from '@/features/account/types';
import { DateFilterParams } from '../shared/types';

export const createAccountAPI = (payload: SubmitAccountPayload) => {
  return post('/accounts', payload);
};

export const updateAccountAPI = (id: string, payload: SubmitAccountPayload) => {
  return patch(`/accounts/${id}`, payload);
};

export const fetchAccountsAPI = () => {
  return get<Account[]>('/accounts');
};

export const fetchAccountsByIdAPI = (id: string) => {
  return get<Account>(`/accounts/${id}`);
};

export const fetchAccountSummaryAPI = (params: DateFilterParams) => {
  const query = new URLSearchParams();

  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);

  return get<AccountTransactionSummaryDto[]>(
    `/accounts/grouped-transactions?${query.toString()}`
  );
};
