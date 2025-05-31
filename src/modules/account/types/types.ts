import {
  BaseGroupItemDTO,
  BaseListSummaryResponseDTO,
} from '@/modules/shared/common/types';
// ✅ 여기서 transaction/types 안 가져오게 수정

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';
export type DeleteAccountResponse = { success: boolean };

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

export type AccountCreateRequestDTO = BaseAccountRequestDTO;

export type AccountUpdateRequestDTO = Partial<AccountCreateRequestDTO>;

// ✅ TransactionDetailDTO 대신 계좌 기반 정보만 유지
export interface AccountTransactionItemDTO {
  label: string;
  rangeStart: string;
  rangeEnd: string;
  accountId: string;
  accountName: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  transactions?: unknown[]; // 또는 Omit<TransactionDetailDTO, 'account'>[] 를 직접 선언
}

export type AccountTransactionSummaryDTO =
  BaseListSummaryResponseDTO<AccountTransactionItemDTO>;
