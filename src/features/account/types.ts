import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '../shared/types';
import { TransactionDetailDTO } from '../transaction/types';

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';

export interface AccountDashboardItemDTO {
  id: string;
  name: string;
  type: AccountType;
  financialType: 'ASSET' | 'LIABILITY';
  amount: number;
  balancePayable?: number;
  outstandingBalance?: number;
  settlementDate?: number | null;
  paymentDate?: number | null;
  autoPayment?: boolean;
}

export interface AccountDashboardDTO {
  asset: number;
  liability: number;
  total: number;
  data: {
    CASH: AccountDashboardItemDTO[];
    BANK: AccountDashboardItemDTO[];
    CARD: AccountDashboardItemDTO[];
  };
}

export interface AccountDetailDTO {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  description?: string;
  color?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
}

export interface BaseAccountRequestDTO {
  type: AccountType;
  name: string;
  color?: string;
  balance: number;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
}

export interface AccountCreateRequestDTO extends BaseAccountRequestDTO {
  type: AccountType;
  name: string;
  color?: string;
  balance: number;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
}

export type AccountUpdateRequestDTO = Partial<AccountCreateRequestDTO>;

export interface AccountTransactionItemDTO extends BaseGroupItemDTO {
  accountId: string;
  accountName: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  transactions?: TransactionDetailDTO[];
}

export type AccountTransactionSummaryDTO =
  BaseListSummaryResponseDTO<AccountTransactionItemDTO>;
