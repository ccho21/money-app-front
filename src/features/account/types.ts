import { Transaction } from '../transaction/types';
export type AccountType = 'CASH' | 'BANK' | 'CARD';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  color?: string; // UI 색상
  balance: number; // 실수형 잔액
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

export type AccountTransactionSummaryParams = {
  startDate: string;
  endDate?: string;
};
