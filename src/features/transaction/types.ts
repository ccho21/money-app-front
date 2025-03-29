export type TransactionType = "income" | "expense";

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
  groupBy: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
};