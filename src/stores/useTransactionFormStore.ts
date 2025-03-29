import {
  SubmitTransactionPayload,
  TransactionFormFields,
} from '@/features/transaction/types';
import { create } from 'zustand';

type TransactionType = 'income' | 'expense' | 'transfer';

interface TransactionFormState extends TransactionFormFields {
  type: TransactionType;
  amount: string;
  accountId: string;
  categoryId: string;
  date: string;
  note: string;
  description: string;
  from: string;
  to: string;

  setField: <K extends keyof TransactionFormState>(
    key: K,
    value: TransactionFormState[K]
  ) => void;

  reset: () => void;
  getFormData: () => SubmitTransactionPayload;
}

const initialState: Omit<
  TransactionFormState,
  'setField' | 'reset' | 'getFormData'
> = {
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

export const useTransactionFormStore = create<TransactionFormState>(
  (set, get) => ({
    ...initialState,

    setField: (key, value) => set((state) => ({ ...state, [key]: value })),

    reset: () => set(() => ({ ...initialState })),

    getFormData: (): SubmitTransactionPayload => {
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
      } = get();

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
          type,
          accountId,
          categoryId,
        };
      }

      return {
        ...base,
        type: 'transfer',
        from,
        to,
      };
    },
  })
);
