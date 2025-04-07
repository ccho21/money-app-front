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
    from: string;
    to: string;
  };
  actions: {
    setField: <K extends keyof TransactionFormState['state']>(
      key: K,
      value: TransactionFormState['state'][K]
    ) => void;
    setAllFields: (data: Partial<TransactionFormFields>) => void;
    init: (data?: Partial<TransactionFormFields>) => void;
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
  from: '',
  to: '',
};

export const useTransactionFormStore = create<TransactionFormState>()(
  devtools(
    (set, get) => ({
      state: { ...initialFormState },
      actions: {
        setField: (key, value) =>
          set(
            (s) => ({ state: { ...s.state, [key]: value } }),
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
              },
            }),
            false,
            'transactionForm/setAllFields'
          ),

        init: (preset = {}) =>
          set(
            () => ({
              state: {
                ...initialFormState,
                ...preset,
                amount: String(preset.amount ?? ''),
              },
            }),
            false,
            'transactionForm/init'
          ),

        reset: () =>
          set(
            () => ({ state: { ...initialFormState } }),
            false,
            'transactionForm/reset'
          ),

        getFormData: () => {
          const {
            type,
            amount,
            accountId,
            categoryId,
            date,
            note,
            description,
            from,
            to,
          } = get().state;

          const base = {
            amount: Number(amount),
            date,
            note: note || undefined,
            description: description || undefined,
          };

          if (type === 'transfer') {
            return {
              ...base,
              type: 'transfer',
              fromAccountId: from,
              toAccountId: to,
            };
          }

          return {
            ...base,
            type,
            accountId,
            categoryId,
          };
        },
      },
    }),
    { name: 'useTransactionFormStore' }
  )
);
