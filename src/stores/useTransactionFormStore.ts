import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  SubmitTransactionPayload,
  TransactionFormFields,
} from '@/features/transaction/types';

type TransactionType = 'income' | 'expense' | 'transfer';

type State = TransactionFormFields;
type Actions = {
  setField: <K extends keyof State>(key: K, value: State[K]) => void;
  setAllFields: (data: Partial<State>) => void;
  init: (preset?: Partial<State>) => void;
  reset: () => void;
  getFormData: () => SubmitTransactionPayload;
  isDirty: () => boolean;
};

interface TransactionFormStore {
  state: State;
  initialState: State;
  actions: Actions;
}

const nowISO = () => new Date().toISOString();

const defaultState: State = {
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

function deepEqual(a: Record<string, any>, b: Record<string, any>) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    const valA = a[key];
    const valB = b[key];

    const isObjA = valA !== null && typeof valA === 'object';
    const isObjB = valB !== null && typeof valB === 'object';

    if (isObjA && isObjB) {
      if (!deepEqual(valA, valB)) return false;
    } else if (valA !== valB) {
      return false;
    }
  }
  return true;
}

export const useTransactionFormStore = create<TransactionFormStore>()(
  devtools(
    (set, get) => ({
      state: { ...defaultState },
      initialState: { ...defaultState },

      actions: {
        setField: (key, value) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                [key]: value,
              },
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
              },
            }),
            false,
            'transactionForm/setAllFields'
          ),

        init: (preset = {}) => {
          const initialized = {
            ...defaultState,
            ...preset,
            amount: String(preset.amount ?? ''),
          };
          set(
            () => ({
              state: initialized,
              initialState: initialized,
            }),
            false,
            'transactionForm/init'
          );
        },

        reset: () =>
          set(
            (s) => ({
              state: { ...s.initialState },
            }),
            false,
            'transactionForm/reset'
          ),

        getFormData: () => {
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
              fromAccountId: state.from,
              toAccountId: state.to,
            };
          }

          return {
            ...base,
            type: state.type,
            accountId: state.accountId,
            categoryId: state.categoryId,
          };
        },

        isDirty: () => {
          const { state, initialState } = get();
          return !deepEqual(state, initialState);
        },
      },
    }),
    { name: 'useTransactionFormStore' }
  )
);
