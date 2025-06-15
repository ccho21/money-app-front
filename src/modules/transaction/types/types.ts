import {
  CategoryDetail,
  CategoryType,
} from '@/modules/category/types/types';
import { Insight } from '@/modules/insights/types/types';

export type Timeframe =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'custom'
  | 'all';

export type GroupBy =
  | 'date'
  | 'category'
  | 'account'
  | 'tag'
  | 'budget'
  | 'note';

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface TransactionGroupQuery {
  timeframe: Timeframe;
  groupBy?: GroupBy; // default 'date'
  startDate: string; // ISO string
  endDate: string; //
  categoryId?: string;
  accountId?: string;
  transactionType?: TransactionType;
  cursor?: string;
  limit?: number;
  note?: string;
  version?: number; // only for front-end
  includeBalance?: boolean;
}

export interface TransactionItem {
  id: string;
  note?: string;
  description?: string;
  amount: number;
  payment: string;
  date: string; // ISO8601 string (e.g., '2025-05-01T14:32:00.000Z')
  type: TransactionType;
  recurringId?: string;
  category?: {
    name: string;
    icon: string;
    color: string;
  } | null;
  account: {
    name: string;
  };
  balanceAfter?: number;
}

export interface TransactionGroupItem {
  groupBy: GroupBy;
  groupKey: string; // ex: '2025-05-01' or 'Food & Drink'
  totalAmount: number;
  transactions: TransactionItem[];
}

export interface TransactionGroupListResponse {
  timeframe: Timeframe;
  startDate: string;
  endDate: string;
  groupBy: GroupBy;
  groups: TransactionGroupItem[];
}

export interface TransactionGroupSummary {
  timeframe: Timeframe;
  groupBy: GroupBy;
  startDate: string;
  endDate: string;

  totalIncome: number;
  totalExpense: number;
  netBalance: number;

  comparison?: {
    difference: number;
    percent: string;
  };

  topSpendingCategory?: {
    categoryId: string;
    name: string;
    icon: string;
    amount: number;
    type: 'income' | 'expense'; // or `CategoryType` if enum exists
  };
}

// 어떻게 할지 결정해야돼 나중에
export interface TransactionAccount {
  id: string;
  name: string;
}

export interface TransactionDetail {
  id: string;
  type: TransactionType;
  amount: number;
  accountId: string;
  toAccountId: string | null;
  linkedTransferId: string | null;
  date: string;
  createdAt: string;
  note?: string | null;
  description?: string | null;

  // ✅ 순환 참조 피하기 위해 최소 필드만 가진 DTO 사용
  account: TransactionAccount;
  toAccount?: TransactionAccount | null;
  category?: CategoryDetail | null;
  dueDate?: string | null;
  paidAt?: string | null;
}

export interface TransactionCalendar {
  date: string;
  income: number;
  expense: number;
}

////////// CHART //////////////////////////////////////////////////

export interface PeriodData {
  period: string; // e.g., '2025-01'
  income: number;
  expense: number;
  saved: number;
  rate: number;
}

export interface TransactionChartFlowResponse {
  timeframe: Timeframe;
  startDate: string; // ISO string: '2025-01-01'
  endDate: string; // ISO string: '2025-12-31'
  insights: Insight[]; // Sorted by priority
  periods: PeriodData[]; // Always full list, zero-filled if no data
}

// types/transaction-chart-category.dto.ts
export interface CategorySpending {
  categoryId: string;
  name: string;
  icon: string;
  amount: number;
  type: CategoryType;
  color?: string;
}

export interface CategoryComparison {
  categoryId: string;
  name: string;
  current: number;
  previous: number;
  difference: number;
  percentChange: string; // e.g., "12.3%"
  trend: 'increase' | 'decrease';
}

export interface TransactionChartCategoryResponse {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  startDate: string; // ISO string
  endDate: string;
  topCategories: CategorySpending[];
  comparison?: CategoryComparison;
}

export interface BudgetUsage {
  categoryId: string;
  name: string;
  icon: string;
  type: CategoryType;
  budget: number;
  used: number;
  over: number;
  remaining: number;
  color?: string;
}

export interface TransactionChartBudgetResponse {
  timeframe: Timeframe;
  startDate: string; // ISO string: '2025-05-01'
  endDate: string; // ISO string: '2025-05-31'
  totalBudget: number;
  totalUsed: number;
  usageRate: number; // e.g. 124 (%)
  overBudget: boolean;
  overCategoryCount: number;
  breakdown: BudgetUsage[];
}

export interface AccountChart {
  accountId: string;
  name: string;
  type: 'CASH' | 'BANK' | 'CARD';
  income: number;
  expense: number;
  balance: number;
  incomePercent: number;
  expensePercent: number;
  balancePercent: number;
  color?: string;
}

export interface TransactionChartAccountResponse {
  timeframe: string;
  startDate: string;
  endDate: string;
  accounts: AccountChart[];
  insights: Insight[];
}

// //////

export interface BaseTransactionRequestDTO {
  type: TransactionType;
  amount: number;
  accountId: string;
  categoryId?: string;
  date: string;
  description?: string;
  note?: string;
}

export type TransactionCreateRequestDTO = BaseTransactionRequestDTO;

export type TransactionUpdateRequestDTO = Partial<TransactionCreateRequestDTO>;

export interface TransactionTransferRequestDTO
  extends BaseTransactionRequestDTO {
  fromAccountId: string;
  toAccountId: string;
}
