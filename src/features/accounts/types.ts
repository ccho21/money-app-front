export interface AccountSummary {
  accountId: string;
  name: string;
  type: 'CASH' | 'CARD' | 'BANK'; // AccountType enum 기준
  color: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
