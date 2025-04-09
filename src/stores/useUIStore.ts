import { ReactNode } from 'react';
import { create } from 'zustand';

interface TopNavConfig {
  title: string;
  center?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onBack?: () => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  showSearchButton?: boolean;
  showFilterButton?: boolean;
  onEdit?: () => void;
  onAdd?: () => void;
}

interface UIState {
  topNav: TopNavConfig;
  previousPath: string | null;
  currentPath: string | null;
  setPaths: (prev: string | null, current: string) => void;

  // 💡 향후 확장 가능: 모달/토스트/슬라이드 패널 등
  isSlidePanelOpen: boolean;
  toggleSlidePanel: (val?: boolean) => void;
  setTopNav: (config: TopNavConfig) => void;
  resetTopNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  topNav: {
    title: '',
    center: true,
    leftSlot: undefined,
    rightSlot: undefined,
    onBack: undefined,
    onSearchClick: undefined,
    onFilterClick: undefined,
    showSearchButton: false,
    showFilterButton: false,
    onEdit: undefined,
    onAdd: undefined,
  },
  previousPath: null,
  currentPath: null,
  setPaths: (prev, current) =>
    set({ previousPath: prev, currentPath: current }),

  isSlidePanelOpen: false,
  toggleSlidePanel: (val) =>
    set((state) => ({
      isSlidePanelOpen: val !== undefined ? val : !state.isSlidePanelOpen,
    })),
  setTopNav: (config: TopNavConfig) =>
    set((state) => ({
      topNav: { ...state.topNav, ...config },
    })),
  resetTopNav: () =>
    set(() => ({
      topNav: {
        title: '',
        center: true,
        leftSlot: undefined,
        rightSlot: undefined,
        onBack: undefined,
        onSearchClick: undefined,
        onFilterClick: undefined,
        showSearchButton: false,
        showFilterButton: false,
        onEdit: undefined,
        onAdd: undefined,
      },
    })),
}));
