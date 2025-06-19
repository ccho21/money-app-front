// src/app/_components/RouteTracker.test.tsx
import { render } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUIStore } from '@/modules/shared/stores/useUIStore';
import RouteTracker from '@/providers/RouteTracker';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/modules/shared/stores/useUIStore', () => ({
  useUIStore: jest.fn(),
}));

describe('RouteTracker', () => {
  const setPathsMock = jest.fn();

  beforeEach(() => {
    (useUIStore as unknown as jest.Mock).mockReturnValue(setPathsMock);

    // sessionStorage mock
    let store: Record<string, string> = {};
    const sessionStorageMock = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
    };
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
      writable: true,
    });

    jest.clearAllMocks();
  });

  it('should set currentPath and previousPath in sessionStorage and call setPaths', () => {
    // 기존 경로가 있었던 상황
    sessionStorage.setItem('currentPath', '/previous-page');

    (usePathname as jest.Mock).mockReturnValue('/new-page');
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'q=123',
    });

    render(<RouteTracker />);

    const current = sessionStorage.getItem('currentPath');
    const previous = sessionStorage.getItem('previousPath');

    expect(previous).toBe('/previous-page');
    expect(current).toBe('/new-page?q=123');

    expect(setPathsMock).toHaveBeenCalledWith(
      '/previous-page',
      '/new-page?q=123'
    );
  });

  it('should handle empty previousPath on first load', () => {
    (usePathname as jest.Mock).mockReturnValue('/only-page');
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => '',
    });

    render(<RouteTracker />);

    expect(sessionStorage.getItem('previousPath')).toBe(null);
    expect(sessionStorage.getItem('currentPath')).toBe('/only-page');

    expect(setPathsMock).toHaveBeenCalledWith(null, '/only-page');
  });
});
