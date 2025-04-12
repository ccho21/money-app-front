import { CategoryType } from '../category/types';

export interface StatsByCategory {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryType: CategoryType;
  amount: number;
  rate: number; // 퍼센트 단위, 소수점 포함
  color: string;
  budget?: string;
}

export interface StatsByCategoryResponse {
  totalIncome: number;
  totalExpense: number;
  data: StatsByCategory[];
}

export interface StatsByBudget {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  icon: string;
  color?: string;

  budgetId?: string; // ✅ budgetCategoryId → budgetId로 이름 변경 (optional)
  budget: number; // ✅ 예산 설정된 금액 (0일 수도 있음)
  spent: number; // ✅ 실제 지출 금액
  remaining: number; // ✅ 예산 - 지출
  rate: number; // ✅ 사용률: (spent / budget) * 100 (예산 없으면 0)

  budgetRate?: number; // ⛔️ 이건 중복 개념. 제거 or 명확히 다르게 쓸 거 아니면 제외 추천
  hasBudget: boolean; // ✅ 예산 설정 여부 (budgetId 존재 여부 기반)
}

export interface StatsByBudgetResponse {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  startDate: string;
  endDate: string;
  data: StatsByBudget[];
}

export interface StatsByNote {
  note: string;
  count: number;
  amount: number;
}

export interface StatsByNoteResponse {
  totalIncome: number;
  totalExpense: number;
  data: StatsByNote[];
}

export interface StatsSummaryByCategory {
  label: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  income: number;
  expense: number;
  total: number;

  // 🔒 추후 확장용 필드
  // transactionCount?: number;
  // categoryMeta?: { icon: string; color: string };
}
export interface StatsSummaryByCategoryResponse {
  categoryId: string;
  categoryName: string;
  data: StatsSummaryByCategory[];
  incomeTotal: number;
  expenseTotal: number;
}

export interface StatsSummaryByBudget {
  label: string; // e.g. "Apr", "2025-04-11"
  startDate: string; // ISO
  endDate: string; // ISO
  expense: number;
  income: number;
  budgetAmount?: number;
  remaining?: number;

  isOver?: boolean;
  isCurrent: boolean;
}

export interface StatsSummaryByBudgetResponse {
  categoryId: string;
  categoryName: string;
  color: string;
  totalExpense: number;
  totalBudget?: number;
  totalRemaining?: number;
  isOver?: boolean;
  data: StatsSummaryByBudget[]; // 💡 unified monthly+daily
}
