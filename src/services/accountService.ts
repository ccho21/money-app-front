import {
  fetchAccountsAPI,
  fetchAccountSummaryAPI,
  fetchAccountsByIdAPI,
  createAccountAPI,
  updateAccountAPI,
} from '@/features/account/api';
import { useAccountStore } from '@/stores/useAccountStore';
import {
  AccountTransactionSummaryParams,
  SubmitAccountPayload,
} from '@/features/account/types';

export const createAccount = async (payload: SubmitAccountPayload) => {
  const { setLoading, setError } = useAccountStore.getState();
  try {
    const data = await createAccountAPI(payload);
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const updateAccount = async (
  id: string,
  payload: SubmitAccountPayload
) => {
  const { setLoading, setError } = useAccountStore.getState();
  console.log('##coming');
  try {
    console.log('##coming');

    const data = await updateAccountAPI(id, payload);
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
  console.log('##done');
};

export const fetchAccounts = async () => {
  const { setAccounts, setLoading, setError } = useAccountStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchAccountsAPI();
    setAccounts(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

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
      err instanceof Error ? err.message : '트랜즈액션 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchAccountTransactionSummary = async (
  params: AccountTransactionSummaryParams
) => {
  const { setSummaries, setLoading, setError } = useAccountStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchAccountSummaryAPI(params);
    setSummaries(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '계좌 요약 데이터 오류';
    setError(message);
  } finally {
    setLoading(false);
  }
};
