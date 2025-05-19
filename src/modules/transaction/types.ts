import { BaseGroupItemDTO, BaseListSummaryResponseDTO } from '@/common/types';
import { CategoryDetailDTO } from '../category/types';
import { TransactionDetail } from './types/types';

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
  transactions: TransactionDetail[];
}

export interface TransactionCalendarDTO {
  date: string;
  income: number;
  expense: number;
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
