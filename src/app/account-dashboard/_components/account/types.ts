import { Transaction } from '../../../../features/transaction/types';
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
export interface AccountSummary {
  accountId: string;
  name: string;
  type: 'CASH' | 'CARD' | 'BANK'; // AccountType enum 기준
  color: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface AccountTransactionSummaryDto {
  accountId: string;
  accountName: string;
  balance: number;
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
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
