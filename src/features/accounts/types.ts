import { Transaction } from "../transaction/types";

export interface AccountSummary {
  accountId: string;
  name: string;
  type: "CASH" | "CARD" | "BANK"; // AccountType enum 기준
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
