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

export interface GroupedTransactionSummary {
  label: string; // 예: '2025-03-20', '2025-03'
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
}

export interface GroupedTransactionDTO {
  range: 'date' | 'week' | 'month' | 'year';
  baseDate: string; // YYYY or YYYY-MM 등
  incomeTotal: number;
  expenseTotal: number;
  data: GroupedTransactionSummary[];
}
