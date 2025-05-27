// 파일: src/modules/transaction/formStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  TransactionCreateRequestDTO,
  TransactionUpdateRequestDTO,
  TransactionTransferRequestDTO,
} from '../types';

export type RecurringFormState = {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate: Date | null;
};

type Mode = 'new' | 'edit';

type TransactionFormState = {
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  accountId: string;
  categoryId?: string;
  date: string;
  note?: string;
  description?: string;
  from?: string;
  to?: string;
  recurring: RecurringFormState;
};

type TransactionFormStore = {
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
};

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
  recurring: {
    enabled: false,
    frequency: 'monthly',
    interval: 1,
    endDate: null,
  },
};

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null)
    return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!b.hasOwnProperty(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
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
          recurring: {
            ...s.state.recurring,
            ...data.recurring,
          },
        },
      })),

    init: (preset = {}) => {
      const merged = {
        ...defaultState,
        ...preset,
        amount: String(preset.amount ?? ''),
        recurring: {
          ...defaultState.recurring,
          ...preset.recurring,
        },
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
        recurring: state.recurring.enabled
          ? {
              frequency: state.recurring.frequency,
              interval: state.recurring.interval,
              startDate: state.date,
              endDate: state.recurring.endDate,
            }
          : undefined,
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
        recurring: state.recurring.enabled
          ? {
              frequency: state.recurring.frequency,
              interval: state.recurring.interval,
              startDate: state.date,
              endDate: state.recurring.endDate,
            }
          : undefined,
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
