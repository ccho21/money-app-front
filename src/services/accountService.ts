import {
  fetchAccountsAPI,
  fetchAccountSummaryAPI,
} from '@/features/accounts/api/account';
import { useAccountStore } from '@/stores/useAccountStore';
import { AccountTransactionSummaryParams } from '@/features/account/types';

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
