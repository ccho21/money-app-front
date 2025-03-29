import { get } from '@/features/shared/api';
import {
  Account,
  AccountTransactionSummaryDto,
  AccountTransactionSummaryParams,
} from '@/features/account/types';

export const fetchAccountsAPI = () => {
  return get<Account[]>('/accounts');
};

export const fetchAccountSummaryAPI = (
  params: AccountTransactionSummaryParams
) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  query.append('endDate', params.endDate);

  return get<AccountTransactionSummaryDto[]>(
    `/accounts/grouped-transactions?${query.toString()}`
  );
};
