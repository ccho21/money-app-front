import { Transaction } from '../transaction/types';

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  color?: string; // UI 색상
  balance: number; // 실수형 잔액
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
}
export interface SubmitAccountPayload {
  name: string;
  balance: number; // amount -> balance
  type: AccountType;
  settlementDate?: number;
  paymentDate?: number;
  description?: string;
}

export interface AccountSummaryDTO {
  accountId: string;
  accountName: string;
  balance: number;
  incomeTotal: number;
  expenseTotal: number;
  rangeStart: string; // 2025-03-01
  rangeEnd: string; // 2025-03-31
}

export type AccountDashboardItem = {
  id: string;
  name: string;
  type: AccountType;
  financialType: FinancialType;
  amount: number;
  outstandingBalance?: number;
  balancePayable?: number;
  settlementDate?: number;
  paymentDate?: number;
};

export type AccountDashboardResponse = {
  asset: number;
  liability: number;
  total: number;
  data: {
    CASH: AccountDashboardItem[];
    BANK: AccountDashboardItem[];
    CARD: AccountDashboardItem[];
  };
};
