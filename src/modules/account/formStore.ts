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
  initialBalance: number;
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
  initialBalance: 0,
};

export const useAccountFormStore = create<
  AccountFormState & AccountFormActions
>()(
  devtools((set, get) => ({
    ...initialState,

    setField: (key, value) => set({ [key]: value }),
    setAllFields: (data) => set(data),
    setMode: (mode) => set({ mode }),
    reset: () => set(initialState),

    getCreateFormData: () => {
      const { name, type, initialBalance } = get();
      return {
        name,
        type,
        initialBalance,
      };
    },

    getUpdateFormData: () => {
      const { name, type, initialBalance } = get();
      return {
        name,
        type,
        initialBalance,
      };
    },
  }))
);
