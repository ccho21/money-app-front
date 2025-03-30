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

  setField: <K extends keyof TransactionFormState>(
    key: K,
    value: TransactionFormState[K]
  ) => void;
  setAllFields: (data: Partial<TransactionFormFields>) => void;

  reset: () => void;
  getFormData: () => SubmitTransactionPayload;
}

const initialState: Omit<
  TransactionFormState,
  'setField' | 'setAllFields' | 'reset' | 'getFormData'
> = {
  type: 'expense',
  amount: '',
  accountId: '',
  categoryId: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  description: '',
};

export const useTransactionFormStore = create<TransactionFormState>(
  (set, get) => ({
    ...initialState,

    setField: (key, value) => set((state) => ({ ...state, [key]: value })),
    setAllFields: (data) =>
      set((state) => ({
        ...state,
        ...data,
        amount: String(data.amount ?? state.amount),
        date: data.date ?? state.date,
        note: data.note ?? '',
        description: data.description ?? '',
        accountId: data.accountId ?? '',
        categoryId: data.categoryId ?? '',
        type: data.type ?? state.type,
      })),
    reset: () => set(() => ({ ...initialState })),

    getFormData: (): SubmitTransactionPayload => {
      const { type, amount, accountId, categoryId, date, note, description } =
        get();

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
      };
    },
  })
);
