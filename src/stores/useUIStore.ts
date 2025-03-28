import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isCategorySelectorOpen: boolean;
  isAccountSelectorOpen: boolean;
  isEditMode: boolean;
  selectedTransactionId: string | null;

  openCategorySelector: () => void;
  closeCategorySelector: () => void;

  openAccountSelector: () => void;
  closeAccountSelector: () => void;

  setEditMode: (value: boolean) => void;

  selectTransaction: (id: string) => void;
  clearSelectedTransaction: () => void;

  clearUIState: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isCategorySelectorOpen: false,
      isAccountSelectorOpen: false,
      isEditMode: false,
      selectedTransactionId: null,

      openCategorySelector: () =>
        set({ isCategorySelectorOpen: true }, false, 'openCategorySelector'),
      closeCategorySelector: () =>
        set({ isCategorySelectorOpen: false }, false, 'closeCategorySelector'),

      openAccountSelector: () =>
        set({ isAccountSelectorOpen: true }, false, 'openAccountSelector'),
      closeAccountSelector: () =>
        set({ isAccountSelectorOpen: false }, false, 'closeAccountSelector'),

      setEditMode: (value) => set({ isEditMode: value }, false, 'setEditMode'),

      selectTransaction: (id) =>
        set({ selectedTransactionId: id }, false, 'selectTransaction'),
      clearSelectedTransaction: () =>
        set({ selectedTransactionId: null }, false, 'clearSelectedTransaction'),

      clearUIState: () =>
        set(
          {
            isCategorySelectorOpen: false,
            isAccountSelectorOpen: false,
            isEditMode: false,
            selectedTransactionId: null,
          },
          false,
          'clearUIState'
        ),
    }),
    { name: 'UIStore' }
  )
);
