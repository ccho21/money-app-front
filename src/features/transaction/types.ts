import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '../shared/types';

export type TransactionType = 'income' | 'expense' | 'transfer';

//
// Transaction detail DTO (response object)
// Corresponds to: TransactionDetailDTO in structure
//
export interface TransactionDetailDTO {
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
// Create transaction DTO for income/expense
// Extends: BaseTransactionRequestDTO
//
export interface TransactionCreateRequestDTO {
  type: TransactionType;
  amount: number;
  date: string;
  accountId: string;
  categoryId?: string;
  note?: string;
  description?: string;
}

//
// Update transaction DTO (Partial type of Create)
// Extends: PartialType<TransactionCreateRequestDTO>
//
export type TransactionUpdateRequestDTO = Partial<TransactionCreateRequestDTO>;

//
// Create transaction DTO for transfer
// Extends: BaseTransactionRequestDTO + from/to
//
export interface TransactionTransferRequestDTO {
  type: 'transfer';
  amount: number;
  date: string;
  fromAccountId: string;
  toAccountId: string;
  note?: string;
  description?: string;
}

//
// Transaction calendar DTO (for calendar view)
// Fields: date, income, expense
//
export interface TransactionCalendarDTO {
  date: string;
  income: number;
  expense: number;
}

//
// Grouped transactions per date unit
// Extends: BaseGroupItemDTO
//
export interface TransactionGroupItemDTO
  extends BaseGroupItemDTO<TransactionGroupItemDTO> {
  label: string;
  rangeStart: string;
  rangeEnd: string;
  transactions: TransactionDetailDTO[];
  groupIncome: number;
  groupExpense: number;
  isCurrent?: boolean;
}

//
// Response DTO for group summary
// Extends: BaseListSummaryResponseDTO
//
export interface TransactionGroupSummaryDTO
  extends BaseListSummaryResponseDTO<TransactionGroupSummaryDTO> {
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
// Frontend form representation
//
export interface TransactionFormFields {
  type: TransactionType;
  amount: string;
  accountId: string;
  categoryId: string;
  date: string;
  note: string;
  description: string;
  from: string;
  to: string;
}

//
// Union for all valid transaction create DTOs
//
export type TransactionRequestDTO =
  | TransactionCreateRequestDTO
  | TransactionTransferRequestDTO;
