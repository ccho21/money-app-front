import { post } from '@/features/shared/api';
import { create } from 'zustand';

type TransactionType = 'income' | 'expense' | 'transfer';

interface TransactionFormState {
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
  submitTransaction: () => Promise<void>;
}

const initialState: Omit<
  TransactionFormState,
  'setField' | 'reset' | 'submitTransaction'
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

    submitTransaction: async () => {
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

      try {
        // 전송할 데이터 타입별로 분기
        let data: any = {
          type,
          amount: Number(amount),
          date,
          note,
          description,
        };

        if (type === 'income' || type === 'expense') {
          data.accountId = accountId;
          data.categoryId = categoryId;
        } else if (type === 'transfer') {
          data.from = from;
          data.to = to;
        }

        await post(`/transactions`, data);

        get().reset();
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : '거래 저장 중 오류가 발생했습니다.';
        console.error('❌ submitTransaction error:', message);
        throw new Error(message);
      }
    },
  })
);
