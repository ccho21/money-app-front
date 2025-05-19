// 파일: src/modules/account/hooks.ts

import { useAccountStore } from './store';
import {
  createAccountAPI,
  updateAccountAPI,
  fetchAccountsAPI,
  fetchAccountByIdAPI,
  fetchAccountSummaryAPI,
  fetchAccountsDashboardAPI,
} from './api';
import type { AccountCreateRequestDTO, AccountUpdateRequestDTO } from './types';
import { DateFilterParams, GroupBy } from '@/common/types';
import { useTransactionStore } from '../transaction/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useEffect } from 'react';

// Create a new account
export const createAccount = async (payload: AccountCreateRequestDTO) => {
  const { setLoading, setError } = useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    return await createAccountAPI(payload);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create account';
    setError(message);
  } finally {
    setLoading(false);
  }
};

// Update an existing account
export const updateAccount = async (
  id: string,
  payload: AccountUpdateRequestDTO
) => {
  const { setLoading, setError } = useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    return await updateAccountAPI(id, payload);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to update account';
    setError(message);
  } finally {
    setLoading(false);
  }
};

// Fetch all accounts and store to Zustand
export const fetchAccounts = async () => {
  const { setLoading, setError, setAccounts } = useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountsAPI();
    setAccounts(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch accounts';
    setError(message);
  } finally {
    setLoading(false);
  }
};

// Fetch account by ID and store to Zustand
export const fetchAccountById = async (id: string) => {
  const { setLoading, setError, setSelectedAccount } =
    useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountByIdAPI(id);
    setSelectedAccount(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch account';
    setError(message);
  } finally {
    setLoading(false);
  }
};

// Fetch account summary and store to Zustand
export const fetchAccountSummary = async (params: DateFilterParams) => {
  const { setLoading, setError, setSummary } = useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountSummaryAPI(params);
    setSummary(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch account summary';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchAccountDashboard = async () => {
  const { setAccountDashboard, setLoading, setError } =
    useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountsDashboardAPI();
    setAccountDashboard(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch dashboard data';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export function useAccountDetailSummary(accountId: string, groupBy: GroupBy) {
  const { summary, isLoading } = useTransactionStore();
  const { getDateRangeKey } = useFilterStore();

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');

    // fetchTransactionSummary({
    //   groupBy,
    //   startDate,
    //   endDate,
    // });
  }, [groupBy, accountId, getDateRangeKey]);

  return { summary, isLoading };
}
