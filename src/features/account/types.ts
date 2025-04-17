// 📁 types/account.dto.ts

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';

//
// ✅ 기본 Account 정보 (DB 기준 + 공통 사용)
//
export interface AccountDTO {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color?: string;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
  createdAt: string;
  updatedAt: string;
}

//
// ✅ 계좌 생성/수정 요청 DTO
//
export interface AccountCreateRequestDTO {
  name: string;
  balance: number;
  type: AccountType;
  color?: string;
  settlementDate?: number;
  paymentDate?: number;
  description?: string;
}

export type AccountUpdateRequestDTO = Partial<AccountCreateRequestDTO>;

//
// ✅ 대시보드 개별 항목 DTO (categoryType은 프론트 계산용)
//
export interface AccountDashboardItemDTO {
  id: string;
  name: string;
  type: AccountType;
  financialType: FinancialType;
  amount: number;
  outstandingBalance?: number;
  balancePayable?: number;
  settlementDate?: number;
  paymentDate?: number;
}

//
// ✅ 대시보드 요약 응답 DTO (프론트 로직 전용)
export interface AccountDashboardResponseDTO {
  asset: number;
  liability: number;
  total: number;
  data: {
    CASH: AccountDashboardItemDTO[];
    BANK: AccountDashboardItemDTO[];
    CARD: AccountDashboardItemDTO[];
  };
}

//
// ✅ 기간별 계좌 요약 DTO (백엔드 정식 DTO와 일치)
export interface AccountTransactionSummaryDTO {
  accountId: string;
  accountName: string;
  balance: number;
  incomeTotal: number;
  expenseTotal: number;
  rangeStart: string;
  rangeEnd: string;
}
