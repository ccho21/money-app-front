import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '@/common/types';
import { CategoryDetailDTO } from '../category/types';

// ✅ 여기서 순환을 피하기 위해 Account 타입은 최소화
export interface TransactionAccountDTO {
  id: string;
  name: string;
}

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
  account: TransactionAccountDTO;
  toAccount?: TransactionAccountDTO | null;
  category?: CategoryDetailDTO | null;
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
