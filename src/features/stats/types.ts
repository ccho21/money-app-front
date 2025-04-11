import { CategoryType } from '../category/types';

export interface StatsByCategory {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryType: CategoryType;
  expense: number;
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
  budget: number;
  budgetRate: number;
  budgetId: string;
  spent: number;
  remaining: number;
  rate: number; // 사용률: 0~100+ (최대 999)
}

export interface StatsByBudgetResponse {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
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
