import { useUIStore } from "@/modules/shared/stores/useUIStore";

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState(useUIStore.getInitialState());
  });

  it('should set previous and current paths', () => {
    useUIStore.getState().setPaths('/prev', '/current');
    const state = useUIStore.getState();
    expect(state.previousPath).toBe('/prev');
    expect(state.currentPath).toBe('/current');
  });

  it('should toggle slide panel (default toggle)', () => {
    expect(useUIStore.getState().isSlidePanelOpen).toBe(false);
    useUIStore.getState().toggleSlidePanel();
    expect(useUIStore.getState().isSlidePanelOpen).toBe(true);
  });

  it('should set slide panel explicitly to false', () => {
    useUIStore.getState().toggleSlidePanel(true); // open first
    useUIStore.getState().toggleSlidePanel(false);
    expect(useUIStore.getState().isSlidePanelOpen).toBe(false);
  });

  it('should merge layout options', () => {
    useUIStore.getState().setLayoutOptions({ hideDateNav: true });
    expect(useUIStore.getState().layoutOptions.hideDateNav).toBe(true);
    expect(useUIStore.getState().layoutOptions.hideTopNav).toBe(false); // unchanged
  });

  it('should reset layout options', () => {
    useUIStore.getState().setLayoutOptions({ hideDateNav: true, hideTopNav: true });
    useUIStore.getState().resetLayoutOptions();
    expect(useUIStore.getState().layoutOptions).toEqual({
      hideTopNav: false,
      hideDateNav: false,
      hideTabMenu: false,
      hideStatsHeader: false,
    });
  });

  it('should update topNav title', () => {
    useUIStore.getState().setTopNav({ title: 'Dashboard' });
    expect(useUIStore.getState().topNav.title).toBe('Dashboard');
  });

  it('should reset topNav', () => {
    useUIStore.getState().setTopNav({ title: 'My Page', onAdd: () => {} });
    useUIStore.getState().resetTopNav();
    expect(useUIStore.getState().topNav).toEqual({
      title: '',
      center: true,
      onBack: undefined,
      onSearch: undefined,
      onFilter: undefined,
      onEdit: undefined,
      onAdd: undefined,
    });
  });
});
