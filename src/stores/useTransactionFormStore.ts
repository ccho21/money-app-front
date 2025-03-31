// 📄 src/stores/transaction/transactionForm.store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  SubmitTransactionPayload,
  TransactionFormFields,
} from '@/features/transaction/types';

type TransactionType = 'income' | 'expense' | 'transfer';

interface TransactionFormState {
  state: {
    type: TransactionType;
    amount: string;
    accountId: string;
    categoryId: string;
    date: string;
    note: string;
    description: string;
  };
  actions: {
    setField: <K extends keyof TransactionFormState['state']>(
      key: K,
      value: TransactionFormState['state'][K]
    ) => void;
    setAllFields: (data: Partial<TransactionFormFields>) => void;
    reset: () => void;
    getFormData: () => SubmitTransactionPayload;
  };
}

const initialFormState: TransactionFormState['state'] = {
  type: 'expense',
  amount: '',
  accountId: '',
  categoryId: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  description: '',
};

export const useTransactionFormStore = create<TransactionFormState>()(
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
            `transactionForm/setField:${key}`
          ),

        setAllFields: (data) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                ...data,
                amount: String(data.amount ?? s.state.amount),
                date: data.date ?? s.state.date,
                note: data.note ?? '',
                description: data.description ?? '',
                accountId: data.accountId ?? '',
                categoryId: data.categoryId ?? '',
                type: data.type ?? s.state.type,
              },
            }),
            false,
            'transactionForm/setAllFields'
          ),

        reset: () =>
          set(
            () => ({ state: { ...initialFormState } }),
            false,
            'transactionForm/reset'
          ),

        getFormData: (): SubmitTransactionPayload => {
          const {
            type,
            amount,
            accountId,
            categoryId,
            date,
            note,
            description,
          } = get().state;

          const base = {
            type,
            amount: Number(amount),
            date,
            note: note || undefined,
            description: description || undefined,
          };

          if (type === 'income' || type === 'expense') {
            return {
              ...base,
              accountId,
              categoryId,
            };
          }

          return {
            ...base,
            type: 'transfer',
          };
        },
      },
    }),
    { name: 'useTransactionFormStore' }
  )
);
