import { useAccountStore } from '@/modules/account/store';
import { DateFilterParams } from '@/shared/types';
import { fetchAccountsDashboardAPI } from '@/features/budget/api';
import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
} from '@/modules/account/types';
import {
  createAccountAPI,
  fetchAccountsAPI,
  fetchAccountsByIdAPI,
  fetchAccountSummaryAPI,
  updateAccountAPI,
} from '@/modules/account/api';

//
// Create a new account
//
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

//
// Update an existing account
//
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

//
// Fetch all accounts
//
export const fetchAccounts = async () => {
  const { setAccounts, setLoading, setError } = useAccountStore.getState();
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

//
// Fetch a specific account by ID
//
export const fetchAccountById = async (id: string) => {
  const { setSelectedAccount, setLoading, setError } =
    useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountsByIdAPI(id);
    setSelectedAccount(data);
    return data;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch account';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Fetch summary data for accounts by date groupBy
//
export const fetchAccountSummary = async (params: DateFilterParams) => {
  const { setSummaryResponse, setLoading, setError } =
    useAccountStore.getState();
  setLoading(true);
  setError(null);
  try {
    const data = await fetchAccountSummaryAPI(params);
    console.log('### DATA', data);
    setSummaryResponse(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch summary';
    setError(message);
  } finally {
    setLoading(false);
  }
};

//
// Fetch dashboard data (temporary budget module dependency)
//
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
