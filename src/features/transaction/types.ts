export type TransactionType = 'income' | 'expense' | 'transfer';

//
// ✅ 트랜잭션 기본 DTO (조회용)
export interface TransactionDTO {
  id: string;
  amount: number;
  date: string; // ISO format
  type: TransactionType;
  note?: string;
  description?: string;
  accountId: string;
  toAccountId?: string;
  linkedTransferId?: string;
  categoryId?: string;
  isOpening?: boolean;
  dueDate?: string;
  paidAt?: string;
}

//
// ✅ 트랜잭션 생성 요청 DTO
export interface TransactionIncomeOrExpenseRequestDTO {
  type: TransactionType;
  amount: number;
  date: string;
  accountId: string;
  categoryId?: string;
  note?: string;
  description?: string;
}

export type TransactionTransferRequestDTO = {
  type: 'transfer';
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  date: string;
  note?: string;
  description?: string;
};

//
// ✅ 트랜잭션 그룹화 항목 (기간별 리스트)
export interface TransactionGroupItemDTO {
  label: string;
  rangeStart: string;
  rangeEnd: string;
  transactions: TransactionDTO[];
  groupIncome: number;
  groupExpense: number;
  isCurrent?: boolean;
}

//
// ✅ 트랜잭션 그룹화 응답 DTO
export interface TransactionGroupSummaryDTO {
  startDate: string;
  endDate: string;
  groupBy: 'daily' | 'weekly' | 'monthly' | 'yearly';
  type?: TransactionType;
  items: TransactionGroupItemDTO[];
  summary?: TransactionGroupItemDTO;
  totalIncome: number;
  totalExpense: number;
}

//
// ✅ 캘린더 뷰용 트랜잭션 DTO
export interface TransactionCalendarDTO {
  date: string;
  transactions: TransactionDTO[];
}

export type TransactionFormFields = {
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  accountId: string;
  categoryId: string;
  date: string;
  note: string;
  description: string;
  from: string;
  to: string;
};

export type TransactionRequestDTO =
  | TransactionIncomeOrExpenseRequestDTO
  | TransactionTransferRequestDTO;
