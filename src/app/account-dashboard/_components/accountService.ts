import {
  fetchAccountsAPI,
  fetchAccountSummaryAPI,
  fetchAccountsByIdAPI,
  createAccountAPI,
  updateAccountAPI,
} from '@/app/account-dashboard/_components/account/api';
import { useAccountStore } from '@/app/account-dashboard/_components/useAccountStore';
import { SubmitAccountPayload } from '@/app/account-dashboard/_components/account/types';
import { DateFilterParams } from '@/features/shared/types';
import { fetchAccountsDashboardAPI } from '@/app/budget/settings/_components/budget/api';

export const createAccount = async (payload: SubmitAccountPayload) => {
  const {
    actions: { setLoading, setError },
  } = useAccountStore.getState();
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
  const {
    actions: { setLoading, setError },
  } = useAccountStore.getState();
  try {
    const data = await updateAccountAPI(id, payload);
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : '계좌 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchAccounts = async () => {
  const {
    actions: { setAccounts, setLoading, setError },
  } = useAccountStore.getState();

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
  const {
    actions: { setSelectedAccount, setLoading, setError },
  } = useAccountStore.getState();

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
  params: DateFilterParams
) => {
  const {
    actions: { setSummaries, setLoading, setError },
  } = useAccountStore.getState();

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

export const fetchAccountDashboard = async () => {
  const {
    actions: { setAccountDashboard, setLoading, setError },
  } = useAccountStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchAccountsDashboardAPI();
    setAccountDashboard(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '계좌 정보를 불러오지 못했습니다.';
    setError(message); // ✅ 누락된 에러 설정
  } finally {
    setLoading(false); // ✅ 항상 로딩 해제
  }
};
