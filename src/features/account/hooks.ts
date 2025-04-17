import { useAccountStore } from '@/stores/useAccountStore';
import { DateFilterParams } from '@/features/shared/types';
import { fetchAccountsDashboardAPI } from '@/features/budget/api';
import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
} from '@/features/account/types';
import {
  createAccountAPI,
  fetchAccountsAPI,
  fetchAccountsByIdAPI,
  fetchAccountSummaryAPI,
  updateAccountAPI,
} from '@/features/account/api';

export const createAccount = async (payload: AccountCreateRequestDTO) => {
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
  payload: AccountUpdateRequestDTO
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

export const fetchAccountSummary = async (params: DateFilterParams) => {
  const {
    actions: { setSummaryResponse, setLoading, setError },
  } = useAccountStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchAccountSummaryAPI(params);
    setSummaryResponse(data);
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
