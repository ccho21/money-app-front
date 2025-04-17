import {
  AccountType,
  AccountCreateRequestDTO,
  AccountUpdateRequestDTO,
} from '@/features/account/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountFormStore {
  state: {
    name: string;
    amount: string;
    group: AccountType;
    description: string;
    isEditMode: boolean;

    // ✅ 카드 계좌용 필드 추가
    settlementDate: number | null;
    paymentDate: number | null;
    autoPayment: boolean;
  };
  actions: {
    setField: <K extends keyof AccountFormStore['state']>(
      key: K,
      value: AccountFormStore['state'][K]
    ) => void;
    setAllFields: (data: Partial<AccountFormStore['state']>) => void;
    setEditMode: (val: boolean) => void;
    toggleEditMode: () => void;
    reset: () => void;
    getFormData: () => AccountCreateRequestDTO | AccountUpdateRequestDTO;
  };
}

const initialFormState: AccountFormStore['state'] = {
  name: '',
  amount: '',
  group: 'CASH',
  description: '',
  isEditMode: false,

  // ✅ 초기화 값 추가
  settlementDate: null,
  paymentDate: null,
  autoPayment: false,
};

export const useAccountFormStore = create<AccountFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...initialFormState },
      actions: {
        setField: (key, value) =>
          set(
            (s) => ({
              state: { ...s.state, [key]: value },
            }),
            false,
            `accountForm/setField:${key}`
          ),

        setAllFields: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                ...data,
                amount: String(data.amount ?? s.state.amount),
              },
            }),
            false,
            'accountForm/setAllFields'
          ),

        setEditMode: (val) =>
          set(
            (s) => ({
              state: { ...s.state, isEditMode: val },
            }),
            false,
            'accountForm/setEditMode'
          ),

        toggleEditMode: () =>
          set(
            (s) => ({
              state: {
                ...s.state,
                isEditMode: !s.state.isEditMode,
              },
            }),
            false,
            'accountForm/toggleEditMode'
          ),

        reset: () =>
          set(
            () => ({ state: { ...initialFormState } }),
            false,
            'accountForm/reset'
          ),

        getFormData: (): AccountCreateRequestDTO | AccountUpdateRequestDTO => {
          const {
            name,
            amount,
            group,
            description,
            settlementDate,
            paymentDate,
          } = get().state;

          return {
            name,
            type: group,
            balance: Number(amount),
            description: description || undefined,
            settlementDate:
              group === 'CARD' ? settlementDate ?? undefined : undefined,
            paymentDate:
              group === 'CARD' ? paymentDate ?? undefined : undefined,
          };
        },
      },
    }),
    { name: '📦 useAccountFormStore' }
  )
);
