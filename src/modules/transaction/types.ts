import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '@/shared/types';
import { CategoryDetailDTO } from '../category/types';

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface TransactionGroupItemDTO extends BaseGroupItemDTO {
  groupIncome: number;
  groupExpense: number;
  isCurrent?: boolean;
  transactions: TransactionDetailDTO[];
}

export interface TransactionCalendarDTO {
  date: string;
  income: number;
  expense: number;
}

export interface TransactionDetailDTO {
  id: string;
  type: string;
  amount: number;
  accountId: string;
  toAccountId?: string;
  linkedTransferId?: string;
  date: string;
  createdAt: string;
  note?: string;
  description?: string;
  category?: CategoryDetailDTO | null;
  account: {
    id: string;
    name: string;
    color?: string | null;
  };
  toAccount?: {
    id: string;
  };
  dueDate?: string | null;
  paidAt?: string | null;
}

// ✅ 구조문서 기반 정의
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

export type TransactionGroupSummaryDTO =
  BaseListSummaryResponseDTO<TransactionGroupItemDTO>;
