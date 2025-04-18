// 📁 types/account.dto.ts

export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type FinancialType = 'ASSET' | 'LIABILITY';

//
// ✅ Core account object - aligned with backend AccountDetailDTO
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
  createdAt?: string;
  updatedAt?: string;
  financialType?: FinancialType; // optional: backend includes this
}

//
// ✅ Account creation request DTO - matches AccountCreateRequestDTO from backend
//
export interface AccountCreateRequestDTO {
  name: string;
  initialBalance: number; // renamed to match backend field
  type: AccountType;
  color?: string;
  settlementDate?: number;
  paymentDate?: number;
  description?: string;
}

//
// ✅ Account update request DTO - partial of create
//
export type AccountUpdateRequestDTO = Partial<AccountCreateRequestDTO>;

//
// ✅ Individual account item for dashboard grouping
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
// ✅ Full dashboard response - grouped by account type
//
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
// ✅ Time-range summary response per account - matches AccountGroupSummaryDTO
//
export interface AccountTransactionSummaryDTO {
  accountId: string;
  accountName: string;
  balance: number;
  incomeTotal: number;
  expenseTotal: number;
  rangeStart: string;
  rangeEnd: string;
}
