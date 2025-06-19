// src/providers/ThemeProvider.test.tsx
import { render } from '@testing-library/react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { ThemeProvider } from 'next-themes';

jest.mock('@/modules/shared/stores/useUserSettingStore', () => ({
  useUserSettingStore: jest.fn(),
}));

// matchMedia mock
function createMatchMedia(matches: boolean): typeof window.matchMedia {
    return () =>
      ({
        matches,
        media: '',
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(), // ✅ 구형 방식 대응
        removeListener: jest.fn(), // ✅ 구형 방식 대응
        dispatchEvent: jest.fn(),
      } as unknown as MediaQueryList);
  }

xdescribe('ThemeProvider', () => {
  const root = document.documentElement;

  beforeEach(() => {
    root.className = ''; // 초기화
    jest.clearAllMocks();
  });

  it('applies dark mode if theme is "dark"', () => {
    (useUserSettingStore as unknown as jest.Mock).mockImplementation((fn) =>
      fn({ theme: 'dark', themeColor: 'blue' })
    );
    window.matchMedia = createMatchMedia(false);

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(root.classList.contains('dark')).toBe(true);
  });

  it('applies light theme color if theme is "light"', () => {
    (useUserSettingStore as unknown as jest.Mock).mockImplementation((fn) =>
      fn({ theme: 'light', themeColor: 'pink' })
    );
    window.matchMedia = createMatchMedia(true);

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(root.classList.contains('dark')).toBe(false);
    expect(root.classList.contains('theme-pink')).toBe(true);
  });

  it('respects system theme when theme is "system"', () => {
    (useUserSettingStore as unknown as jest.Mock).mockImplementation((fn) =>
      fn({ theme: 'system', themeColor: 'green' })
    );
    window.matchMedia = createMatchMedia(true); // system prefers dark

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(root.classList.contains('dark')).toBe(true);
    expect(root.classList.contains('theme-green')).toBe(false); // dark이면 테마색 없음
  });

  it('removes old theme classes before applying new', () => {
    root.classList.add('theme-blue');

    (useUserSettingStore as unknown as jest.Mock).mockImplementation((fn) =>
      fn({ theme: 'light', themeColor: 'red' })
    );
    window.matchMedia = createMatchMedia(false);

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(root.classList.contains('theme-blue')).toBe(false);
    expect(root.classList.contains('theme-red')).toBe(true);
  });
});
