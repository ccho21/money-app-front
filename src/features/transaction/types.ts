export type TransactionType = 'income' | 'expense';

export interface TransactionCategory {
  id?: string;
  name: string;
  icon: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  note: string;
  date: string; // ISO 형식 ('2025-03-20T00:00:00.000Z')
  category: TransactionCategory;
}

export interface GroupedTransactions {
  label: string; // 예: '2025-03-20', '2025-03'
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
}

export interface TransactionGroupResponse {
  type: 'weekly' | 'monthly' | 'yearly';
  date: string;
  incomeTotal: number;
  expenseTotal: number;
  data: GroupedTransactions[];
}

export interface TransactionCalendarItem {
  date: string;
  income: number;
  expense: number;
}
