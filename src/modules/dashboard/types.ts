// ✅ 월간 요약용
// frontend/modules/dashboard/types.ts

export type DashboardInsightDTO = {
  id: string;
  message: string;
  value?: string;
};

export type DashboardCategoryMonthlyDTO = {
  categoryId: string;
  name: string;
  percent: number;
  color?: string;
};

export type DashboardBudgetComparisonDTO = {
  previousUsageRate: number;
  difference: number;
  percentChange: string;
  trend: 'increase' | 'decrease';
};

export type DashboardBudgetDTO = {
  used: number;
  total: number;
  usageRate: number;
  comparison?: DashboardBudgetComparisonDTO;
};

export type DashboardMonthlyComparisonDTO = {
  previousAmount: number;
  difference: number;
  percentChange: string;
  trend: 'increase' | 'decrease';
};

export type DashboardMonthlySpendingDTO = {
  amount: number;
  comparison?: DashboardMonthlyComparisonDTO;
};

export type DashboardDTO = {
  balance: number;
  budget: DashboardBudgetDTO;
  monthlySpending: DashboardMonthlySpendingDTO;
  categoryMonthly: DashboardCategoryMonthlyDTO[];
  insights: DashboardInsightDTO[];
};