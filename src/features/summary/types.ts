// 📌 카테고리별 소비 요약
export interface SummaryCategory {
    category: string;
    amount: number;
  }
  
  // 📌 예산 초과 경고 항목
  export interface BudgetAlert {
    category: string;
    budget: number;
    spent: number;
    exceededBy: number;
  }
  
  // 📌 Summary API 전체 응답 구조
  export interface SummaryResponse {
    totalSpent: number;
    byCategory: SummaryCategory[];
    byDate: Record<string, number>; // 'YYYY-MM-DD': amount
    topCategory: SummaryCategory;
    budgetAlerts: BudgetAlert[];
  }