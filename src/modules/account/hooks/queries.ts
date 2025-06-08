'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAccountsAPI,
  fetchAccountByIdAPI,
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

export const useAccounts = () =>
  useQuery<AccountDetailDTO[]>({
    queryKey: ['accounts'],
    queryFn: fetchAccountsAPI,
    staleTime: 1000 * 60 * 5,
  });

export const useAccountById = (accountId: string, enabled = true) =>
  useQuery({
    queryKey: ['account', accountId],
    queryFn: () => fetchAccountByIdAPI(accountId),
    enabled: enabled && !!accountId,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AccountCreateRequestDTO) => createAccountAPI(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

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
