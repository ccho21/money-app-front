// 📄 src/stores/account/accountForm.store.ts

import { AccountType, SubmitAccountPayload } from '@/features/account/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountFormStore {
  state: {
    name: string;
    amount: string;
    group: AccountType;
    description: string;
    isEditMode: boolean;
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
    getFormData: () => SubmitAccountPayload;
  };
}

const initialFormState: AccountFormStore['state'] = {
  name: '',
  amount: '',
  group: 'CASH',
  description: '',
  isEditMode: false,
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

        getFormData: (): SubmitAccountPayload => {
          const { name, amount, group, description } = get().state;
          return {
            name,
            type: group,
            balance: Number(amount),
            description: description || undefined,
          };
        },
      },
    }),
    { name: '📦 useAccountFormStore' }
  )
);
