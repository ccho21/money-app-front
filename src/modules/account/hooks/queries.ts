'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAccountsAPI,
  fetchAccountByIdAPI,
  fetchAccountSummaryAPI,
  fetchAccountsDashboardAPI,
  createAccountAPI,
  updateAccountAPI,
  deleteAccountAPI,
  // deleteAccountAPI,
} from '../api';
import { DateFilterParams } from '@/modules/shared/common/types';
import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
  AccountDetailDTO,
} from '../types/types';

// ✅ 1. 전체 계좌 목록
export const useAccounts = () =>
  useQuery<AccountDetailDTO[]>({
    queryKey: ['accounts'],
    queryFn: fetchAccountsAPI,
    staleTime: 1000 * 60 * 5,
  });

// ✅ 2. 단일 계좌 조회
export const useAccountById = (accountId: string, enabled = true) =>
  useQuery({
    queryKey: ['account', accountId],
    queryFn: () => fetchAccountByIdAPI(accountId),
    enabled: enabled && !!accountId,
    staleTime: 1000 * 60 * 5,
  });

// ✅ 3. 계좌 요약 정보 (기간 필터)
export const useAccountSummary = (params: DateFilterParams) =>
  useQuery({
    queryKey: ['account-summary', params],
    queryFn: () => fetchAccountSummaryAPI(params),
    enabled: !!params?.startDate && !!params?.endDate,
    staleTime: 1000 * 60 * 5,
  });

// ✅ 4. 계좌 대시보드
export const useAccountDashboard = () =>
  useQuery({
    queryKey: ['account-dashboard'],
    queryFn: fetchAccountsDashboardAPI,
    staleTime: 1000 * 60 * 10,
  });

// ✅ 5. 계좌 생성
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AccountCreateRequestDTO) => createAccountAPI(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

// ✅ 6. 계좌 수정
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccountUpdateRequestDTO }) =>
      updateAccountAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

// ✅ 7. 계좌 삭제
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAccountAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};
