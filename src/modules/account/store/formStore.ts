import {
  AccountCreateRequest,
  AccountUpdateRequestDTO,
  AccountType,
} from '../types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Mode = 'new' | 'edit';

interface AccountFormState {
  mode: Mode;
  name: string;
  type: AccountType;
  balance: string; // ✅ string으로 변경
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
  validate: () => string | null;
  getCreateFormData: () => AccountCreateRequest;
  getUpdateFormData: () => AccountUpdateRequestDTO;
}

const initialState: AccountFormState = {
  mode: 'new',
  name: '',
  type: 'CASH',
  balance: '', // ✅ string 기본값
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

    setField: (key, value) =>
      set((state) => ({
        ...state,
        [key]: value,
      })),

    setAllFields: (data) => {
      const safeData = Object.fromEntries(
        Object.entries(data).filter(([key]) => key in initialState)
      );

      set({
        ...(safeData.balance !== undefined
          ? { balance: String(safeData.balance) }
          : {}),
        ...safeData,
      } as Partial<AccountFormState>);
    },

    setMode: (mode) => set({ mode }),

    reset: () => set(initialState),

    validate: () => {
      const { name, balance } = get();
      if (!name.trim()) return 'Account name is required.';
      const parsed = Number(balance);
      if (isNaN(parsed)) return 'Balance must be a valid number.';
      return null;
    },

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
        balance: Number(balance), // ✅ 변환
        description: description?.trim() || undefined,
        color: color?.trim() || undefined,
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

      if (typeof name === 'string' && name.trim()) dto.name = name.trim();
      if (typeof balance === 'string' && !isNaN(Number(balance))) {
        dto.balance = Number(balance); // ✅ 변환
      }
      if (typeof type === 'string') dto.type = type;
      if (typeof description === 'string' && description.trim())
        dto.description = description.trim();
      if (typeof color === 'string' && color.trim()) dto.color = color.trim();
      if (typeof settlementDate === 'number')
        dto.settlementDate = settlementDate;
      if (typeof paymentDate === 'number') dto.paymentDate = paymentDate;
      if (typeof autoPayment === 'boolean') dto.autoPayment = autoPayment;

      return dto;
    },
  }))
);
