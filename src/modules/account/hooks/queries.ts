'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAccountsAPI,
  fetchAccountByIdAPI,
  createAccountAPI,
  updateAccountAPI,
  deleteAccountAPI,
} from '../api';
import {
  AccountCreateRequest,
  AccountUpdateRequestDTO,
  AccountDetail,
} from '../types/types';

export const useAccounts = () =>
  useQuery<AccountDetail[]>({
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
    mutationFn: (input: AccountCreateRequest) => createAccountAPI(input),
    onSuccess: (createdAccount) => {
      const accountId = createdAccount.id;

      queryClient.invalidateQueries({ queryKey: ['account', accountId] });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'transaction-groups' &&
          query.queryKey[1] === accountId,
      });

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccountUpdateRequestDTO }) =>
      updateAccountAPI(id, data),

    onSuccess: (_, { id }) => {
      if (!id) return;

      queryClient.invalidateQueries({ queryKey: ['account', id] });

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'transaction-groups' &&
          query.queryKey[1] === id,
      });

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAccountAPI(id),

    onSuccess: (_, id) => {
      if (!id) return;

      queryClient.invalidateQueries({ queryKey: ['account', id] });

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'transaction-groups' &&
          query.queryKey[1] === id,
      });

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};
