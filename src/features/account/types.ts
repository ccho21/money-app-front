import { BaseListSummaryResponseDTO } from '../shared/types';

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';

//
// BaseAccountRequestDTO
// From: accounts.module (Base DTO for both create and update)
//
export interface BaseAccountRequestDTO {
  name: string;
  type: AccountType;
  autoPayment: boolean;
  color?: string;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
}

//
// AccountCreateRequestDTO
// From: accounts.module
// Extends: BaseAccountRequestDTO + initialBalance
//
export interface AccountCreateRequestDTO extends BaseAccountRequestDTO {
  initialBalance: number;
}

//
// AccountUpdateRequestDTO
// From: accounts.module
// Extends: Partial<AccountCreateRequestDTO>
// Implements: PartialType
//
export type AccountUpdateRequestDTO = Partial<AccountCreateRequestDTO>;

//
// AccountDetailDTO
// From: accounts.module
// Full account object used in response
//
export interface AccountDetailDTO {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color?: string;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
  createdAt?: string;
  updatedAt?: string;
  financialType?: FinancialType;
}

//
// AccountDashboardItemDTO
// For: grouped dashboard display
//
export interface AccountDashboardItemDTO {
  id: string;
  name: string;
  type: AccountType;
  financialType: FinancialType;
  amount: number;
  outstandingBalance?: number;
  balancePayable?: number;
  settlementDate?: number;
  paymentDate?: number;
}

//
// AccountDashboardResponseDTO
// Grouped response for dashboard
//
export interface AccountDashboardResponseDTO {
  asset: number;
  liability: number;
  total: number;
  data: {
    CASH: AccountDashboardItemDTO[];
    BANK: AccountDashboardItemDTO[];
    CARD: AccountDashboardItemDTO[];
  };
}

//
// AccountTransactionSummaryDTO
// From: common.module
// Extends: BaseListSummaryResponseDTO
//
export interface AccountTransactionSummaryDTO
  extends BaseListSummaryResponseDTO<AccountTransactionSummaryDTO> {
  accountId: string;
  accountName: string;
  balance: number;
  incomeTotal: number;
  expenseTotal: number;
  rangeStart: string;
  rangeEnd: string;
}
