// 파일: src/modules/account/formStore.ts

import {
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
  AccountType,
} from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Mode = 'new' | 'edit';

interface AccountFormState {
  mode: Mode;
  name: string;
  type: AccountType;
  balance: number;
  description?: string;
  color?: string;
  settlementDate?: number;
  paymentDate?: number;
  autoPayment?: boolean;
}

interface AccountFormActions {
  setField: <K extends keyof AccountFormState>(
    key: K,
    value: AccountFormState[K]
  ) => void;
  setAllFields: (data: Partial<AccountFormState>) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
  getCreateFormData: () => AccountCreateRequestDTO;
  getUpdateFormData: () => AccountUpdateRequestDTO;
}

const initialState: AccountFormState = {
  mode: 'new',
  name: '',
  type: 'CASH',
  balance: 0,
  description: '',
  color: '',
  settlementDate: undefined,
  paymentDate: undefined,
  autoPayment: false,
};

export const useAccountFormStore = create<
  AccountFormState & AccountFormActions
>()(
  devtools((set, get) => ({
    ...initialState,

    setField: (key, value) => set({ [key]: value }),
    setAllFields: (data) => set({ ...get(), ...data }),
    setMode: (mode) => set({ mode }),
    reset: () => set(initialState),

    getCreateFormData: () => {
      const {
        name,
        type,
        balance,
        description,
        color,
        settlementDate,
        paymentDate,
        autoPayment,
      } = get();

      return {
        name,
        type,
        balance,
        description,
        color,
        settlementDate,
        paymentDate,
        autoPayment,
      };
    },

    getUpdateFormData: () => {
      const {
        name,
        type,
        balance,
        description,
        color,
        settlementDate,
        paymentDate,
        autoPayment,
      } = get();

      const dto: AccountUpdateRequestDTO = {};
      if (name) dto.name = name;
      if (type) dto.type = type;
      if (balance !== undefined) dto.balance = balance;
      if (description) dto.description = description;
      if (color) dto.color = color;
      if (settlementDate !== undefined) dto.settlementDate = settlementDate;
      if (paymentDate !== undefined) dto.paymentDate = paymentDate;
      if (autoPayment !== undefined) dto.autoPayment = autoPayment;

      return dto;
    },
  }))
);
