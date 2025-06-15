export type AccountType = 'CASH' | 'BANK' | 'CARD';
export type DeleteAccountResponse = { success: boolean };

export interface AccountDetail {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  description?: string;
  color?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
}

export type AccountCreateRequest = {
  type: AccountType;
  name: string;
  color?: string;
  balance: number;
  description?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
};

export type AccountUpdateRequestDTO = Partial<AccountCreateRequest>;
