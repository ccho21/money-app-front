import { create } from 'zustand';

export interface LayoutOptions {
  hideDateNav?: boolean;
  hideMonthNav?: boolean;
  hideTabMenu?: boolean;
  hideStatsHeader?: boolean;
  hideSummaryBox?: boolean;
}

export interface TopNavConfig {
  title: string;
  center?: boolean;
  showSearchButton?: boolean;
  showFilterButton?: boolean;
  onBack?: () => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onEdit?: () => void;
  onAdd?: () => void;
}

interface UIState {
  layoutOptions: LayoutOptions;
  topNav: TopNavConfig;
  previousPath: string | null;
  currentPath: string | null;

  isSlidePanelOpen: boolean;

  // ✅ 상태 설정 전용 setter들
  setPaths: (prev: string | null, current: string) => void;
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
  isSlidePanelOpen: false,

  setPaths: (prev, current) =>
    set({ previousPath: prev, currentPath: current }),

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
