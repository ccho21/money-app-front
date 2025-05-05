import { create } from 'zustand';

export interface LayoutOptions {
  hideTopNav?: boolean;
  hideDateNav?: boolean;
  hideMonthNav?: boolean;
  hideTabMenu?: boolean;
  hideStatsHeader?: boolean;
  hideSummaryBox?: boolean;
}

interface TopNavConfig {
  title: string;
  center?: boolean;
  // leftSlot?: ReactNode;
  // rightSlot?: ReactNode;
  onBack?: () => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  showSearchButton?: boolean;
  showFilterButton?: boolean;
  onEdit?: () => void;
  onAdd?: () => void;
}

interface UIState {
  layoutOptions: LayoutOptions;
  topNav: TopNavConfig;
  previousPath: string | null;
  currentPath: string | null;
  setPaths: (prev: string | null, current: string) => void;

  // 💡 향후 확장 가능: 모달/토스트/슬라이드 패널 등
  isSlidePanelOpen: boolean;
  toggleSlidePanel: (val?: boolean) => void;
  setLayoutOptions: (opts: LayoutOptions) => void;
  resetLayoutOptions: () => void;

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
  layoutOptions: {
    hideTopNav: false,
    hideDateNav: false,
    hideTabMenu: false,
    hideStatsHeader: false,
  },
  setPaths: (prev, current) =>
    set({ previousPath: prev, currentPath: current }),
  isSlidePanelOpen: false,
  toggleSlidePanel: (val) =>
    set((state) => ({
      isSlidePanelOpen: val !== undefined ? val : !state.isSlidePanelOpen,
    })),
  setLayoutOptions: (options: LayoutOptions) =>
    set((state) => ({
      layoutOptions: { ...state.layoutOptions, ...options },
    })),
  resetLayoutOptions: () =>
    set(() => ({
      layoutOptions: {
        hideTopNav: false,
        hideDateNav: false,
        hideTabMenu: false,
        hideStatsHeader: false,
      },
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
