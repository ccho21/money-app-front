import { AccountType, SubmitAccountPayload } from '@/features/account/types';
import { create } from 'zustand';

interface AccountFormState {
  // ✅ 폼 상태
  name: string;
  amount: string;
  group: AccountType;
  description: string;

  // ✅ UI 상태
  isEditMode: boolean;

  // ✅ 액션
  setField: <K extends keyof AccountFormState>(
    key: K,
    value: AccountFormState[K]
  ) => void;
  setAllFields: (data: Partial<AccountFormState>) => void;
  setEditMode: (val: boolean) => void;
  toggleEditMode: () => void;

  reset: () => void;
  getFormData: () => SubmitAccountPayload;
}

const initialState: Omit<
  AccountFormState,
  | 'setField'
  | 'setAllFields'
  | 'reset'
  | 'getFormData'
  | 'isEditMode'
  | 'setEditMode'
  | 'toggleEditMode'
> = {
  name: '',
  amount: '',
  group: 'CASH',
  description: '',
};

export const useAccountFormStore = create<AccountFormState>((set, get) => ({
  ...initialState,
  isEditMode: false,

  setField: (key, value) => set((state) => ({ ...state, [key]: value })),

  setAllFields: (data) =>
    set((state) => ({
      ...state,
      ...data,
      amount: String(data.amount),
    })),

  setEditMode: (val) => set({ isEditMode: val }),

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

  reset: () => set(() => ({ ...initialState, isEditMode: false })),

  getFormData: (): SubmitAccountPayload => {
    const { name, amount, group, description } = get();
    return {
      name,
      type: group, // ✅ group → type
      balance: Number(amount), // amount -> balance
      description: description || undefined,
    };
  },
}));
