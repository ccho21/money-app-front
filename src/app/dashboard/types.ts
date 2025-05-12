import { CategoryType } from '@/modules/category/types';

// ✅ 월간 요약용
export interface DashboardSummaryDTO {
  income: number;
  expense: number;
  balance: number;
}

// ✅ 최근 거래용 (경량화된 Transaction DTO)
export interface DashboardTransactionPreviewDTO {
  id: string;
  title: string; // category.name or description fallback
  amount: number;
  type: CategoryType;
  date: string;
  accountName: string;
  categoryName?: string;
}
