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
    getCreateFormData: () => AccountCreateRequestDTO;
    getupdateFormData: () => AccountUpdateRequestDTO;
  };
}

const initialFormState: AccountFormStore['state'] = {
  name: '',
  amount: '',
  group: 'CASH',
  description: '',
  isEditMode: false,
  settlementDate: null,
  paymentDate: null,
  autoPayment: false,
};

export const useAccountFormStore = create<AccountFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...initialFormState },
      actions: {
        //
        // Set a single form field by key
        //
        setField: (key, value) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                [key]: value,
              },
            }),
            false,
            `accountForm/setField:${key}`
          ),
        //
        // Set multiple fields at once
        //
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
        //
        // Set edit mode flag
        //
        setEditMode: (val) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                isEditMode: val,
              },
            }),
            false,
            'accountForm/setEditMode'
          ),
        //
        // Toggle edit mode flag
        //
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
        //
        // Reset form to initial state
        //
        reset: () =>
          set(
            () => ({
              state: {
                ...initialFormState,
              },
            }),
            false,
            'accountForm/reset'
          ),
        //
        // Get form data for account creation
        //
        getCreateFormData: (): AccountCreateRequestDTO => {
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
            initialBalance: parseFloat(amount),
            description: description || undefined,
            settlementDate:
              group === 'CARD' ? settlementDate ?? undefined : undefined,
            paymentDate:
              group === 'CARD' ? paymentDate ?? undefined : undefined,
          };
        },

        //
        // Get form data for account update
        //
        getUpdateFormData: (): AccountUpdateRequestDTO => {
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
            initialBalance: amount ? parseFloat(amount) : undefined,
            description: description || undefined,
            settlementDate:
              group === 'CARD' ? settlementDate ?? undefined : undefined,
            paymentDate:
              group === 'CARD' ? paymentDate ?? undefined : undefined,
          };
        },
      },
    }),
    { name: 'useAccountFormStore' }
  )
);
