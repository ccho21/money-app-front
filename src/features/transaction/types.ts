export type TransactionType = 'income' | 'expense';

export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
}
interface TransactionAccount {
  id: string;
  name: string;
  type: string;
  color?: string | null;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string; // ISO 형식 ('2025-03-20T00:00:00.000Z')
  category: TransactionCategory;
  account: TransactionAccount;
  note?: string;
  description?: string;
}

export interface TransactionSummary {
  label: string; // 예: '2025-03-20', '2025-03'
  rangeStart: string;
  rangeEnd: string;
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
}

export interface TransactionSummaryResponse {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  incomeTotal: number;
  expenseTotal: number;
  data: TransactionSummary[]; // ✅ 날짜/월/연 단위로 그룹된 데이터 목록
}

export interface TransactionCalendarItem {
  date: string;
  income: number;
  expense: number;
}

export type FetchTransactionSummaryParams = {
  groupBy: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate?: string;
};

export type TransactionFormFields = {
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  accountId: string;
  categoryId: string;
  date: string;
  note: string;
  description: string;
};

export type IncomeOrExpensePayload = {
  type: 'income' | 'expense';
  amount: number;
  accountId: string;
  categoryId: string;
  date: string;
  note?: string;
  description?: string;
};

export type TransferPayload = {
  type: 'transfer';
  amount: number;
  // from: string;
  // to: string;
  date: string;
  note?: string;
  description?: string;
};

export type SubmitTransactionPayload = IncomeOrExpensePayload | TransferPayload;
