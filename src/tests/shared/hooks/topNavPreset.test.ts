import { renderHook } from '@testing-library/react';
import { useUIStore } from '@/modules/shared/stores/useUIStore';
import { useTopNavPreset } from '@/modules/shared/hooks/topNavPreset';

jest.mock('@/modules/shared/stores/useUIStore', () => {
  const setTopNav = jest.fn();
  const resetTopNav = jest.fn();

  return {
    useUIStore: {
      getState: () => ({
        setTopNav,
        resetTopNav,
      }),
    },
  };
});

describe('useTopNavPreset', () => {
  const mockSetTopNav = useUIStore.getState().setTopNav as jest.Mock;
  const mockResetTopNav = useUIStore.getState().resetTopNav as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls setTopNav with given config on mount', () => {
    const config = {
      title: 'My Page',
      onSearch: jest.fn(),
      onFilter: jest.fn(),
    };

    renderHook(() => useTopNavPreset(config));

    expect(mockSetTopNav).toHaveBeenCalledTimes(1);
    expect(mockSetTopNav).toHaveBeenCalledWith(config);
  });

  it('calls resetTopNav on unmount', () => {
    const config = { title: 'Test Title' };
    const { unmount } = renderHook(() => useTopNavPreset(config));

    unmount();
    expect(mockResetTopNav).toHaveBeenCalledTimes(1);
  });

  it('calls setTopNav again when config changes', () => {
    const configA = { title: 'Page A' };
    const configB = { title: 'Page B' };

    const { rerender } = renderHook(({ config }) => useTopNavPreset(config), {
      initialProps: { config: configA },
    });

    expect(mockSetTopNav).toHaveBeenCalledWith(configA);

    rerender({ config: configB });

    expect(mockSetTopNav).toHaveBeenCalledWith(configB);
  });
});
