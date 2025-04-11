import { Account } from "../account/types";

export type TransactionType = "income" | "expense" | "transfer";

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: "income" | "expense";
  color?: string | null;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  accountId: string;
  toAccountId?: string;
  linkedTransferId?: string;
  note?: string | null;
  description?: string | null;
  date: string; // ISO 형식 문자열
  category?: Category;
  account: Account; // 출금 계좌
  toAccount?: Account; // 입금 계좌 (transfer만)
  createdAt?: string;
}

// 날짜별 / 월별 그룹 데이터
export interface TransactionSummary {
  label: string; // 예: '2025-03-25', '2025-03'
  rangeStart: string; // yyyy-MM-dd
  rangeEnd: string; // yyyy-MM-dd
  incomeTotal: number;
  expenseTotal: number;
  transactions: Transaction[];
}

// 전체 응답 DTO (백엔드 TransactionSummaryDTO)
export interface TransactionSummaryResponse {
  type: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate: string;
  incomeTotal: number;
  expenseTotal: number;
  data: TransactionSummary[];
}

export interface TransactionCalendarItem {
  date: string;
  income: number;
  expense: number;
}

export type TransactionFormFields = {
  type: "income" | "expense" | "transfer";
  amount: string;
  accountId: string;
  categoryId: string;
  date: string;
  note: string;
  description: string;
  from: string;
  to: string;
};

export type IncomeOrExpensePayload = {
  type: "income" | "expense";
  amount: number;
  accountId: string;
  categoryId: string;
  date: string;
  note?: string;
  description?: string;
};

export type TransferPayload = {
  type: "transfer";
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  date: string;
  note?: string;
  description?: string;
};

export type SubmitTransactionPayload = IncomeOrExpensePayload | TransferPayload;
