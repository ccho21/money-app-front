// 파일: src/modules/transaction/formStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  TransactionCreateRequestDTO,
  TransactionUpdateRequestDTO,
  TransactionTransferRequestDTO,
} from './types';

type Mode = 'new' | 'edit';

interface TransactionFormState {
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  accountId: string;
  categoryId?: string;
  date: string;
  note?: string;
  description?: string;
  from?: string;
  to?: string;
}

interface TransactionFormStore {
  mode: Mode;
  state: TransactionFormState;
  initialState: TransactionFormState;

  setField: <K extends keyof TransactionFormState>(
    key: K,
    value: TransactionFormState[K]
  ) => void;
  setAllFields: (data: Partial<TransactionFormState>) => void;
  init: (preset?: Partial<TransactionFormState>) => void;
  reset: () => void;
  getCreateFormData: () =>
    | TransactionCreateRequestDTO
    | TransactionTransferRequestDTO;
  getUpdateFormData: () => Partial<
    TransactionUpdateRequestDTO | TransactionTransferRequestDTO
  >;
  getTransferFormData: () => TransactionTransferRequestDTO;
  isDirty: () => boolean;
}

const nowISO = () => new Date().toISOString();

const defaultState: TransactionFormState = {
  type: 'expense',
  amount: '',
  accountId: '',
  categoryId: '',
  date: nowISO(),
  note: '',
  description: '',
  from: '',
  to: '',
};

function deepEqual<T extends object>(a: T, b: T): boolean {
  const aKeys = Object.keys(a) as (keyof T)[];
  const bKeys = Object.keys(b) as (keyof T)[];
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export const useTransactionFormStore = create<TransactionFormStore>()(
  devtools((set, get) => ({
    mode: 'new',
    state: { ...defaultState },
    initialState: { ...defaultState },

    setField: (key, value) =>
      set((s) => ({
        state: { ...s.state, [key]: value },
      })),

    setAllFields: (data) =>
      set((s) => ({
        state: {
          ...s.state,
          ...data,
          amount: String(data.amount ?? s.state.amount),
        },
      })),

    init: (preset = {}) => {
      const merged = {
        ...defaultState,
        ...preset,
        amount: String(preset.amount ?? '0'),
      };
      const isEdit = Object.keys(preset).length > 0;
      set(() => ({
        state: merged,
        initialState: merged,
        mode: isEdit ? 'edit' : 'new',
      }));
    },

    reset: () => {
      const { mode, initialState } = get();
      const fallback = { ...defaultState };
      set(() => ({
        state: mode === 'edit' ? { ...initialState } : fallback,
      }));
    },

    getCreateFormData: () => {
      const { state } = get();
      const base = {
        amount: Number(state.amount),
        date: state.date,
        note: state.note || undefined,
        description: state.description || undefined,
      };

      if (state.type === 'transfer') {
        return {
          ...base,
          type: 'transfer',
          fromAccountId: state.from!,
          toAccountId: state.to!,
        };
      }

      return {
        ...base,
        type: state.type,
        accountId: state.accountId,
        categoryId: state.categoryId,
      };
    },

    getUpdateFormData: () => {
      const { state } = get();
      const base = {
        amount: state.amount ? Number(state.amount) : undefined,
        date: state.date,
        note: state.note || undefined,
        description: state.description || undefined,
      };

      if (state.type === 'transfer') {
        return {
          ...base,
          type: 'transfer',
          fromAccountId: state.from || undefined,
          toAccountId: state.to || undefined,
        };
      }

      return {
        ...base,
        type: state.type,
        accountId: state.accountId || undefined,
        categoryId: state.categoryId || undefined,
      };
    },

    getTransferFormData: () => {
      const { state } = get();
      return {
        type: 'transfer',
        amount: Number(state.amount),
        date: state.date,
        note: state.note,
        description: state.description,
        fromAccountId: state.from!,
        toAccountId: state.to!,
      };
    },

    isDirty: () => {
      const { state, initialState } = get();
      return !deepEqual(state, initialState);
    },
  }))
);
