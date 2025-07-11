'use client';

import { useEffect } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUserSettingStore((s) => s.theme);
  const themeColor = useUserSettingStore((s) => s.themeColor);

  useEffect(() => {
    const root = document.body;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = theme === 'dark';
      root.classList.toggle('dark', isDark);

      root.classList.remove(
        'theme-red',
        'theme-rose',
        'theme-orange',
        'theme-green',
        'theme-blue',
        'theme-yellow',
        'theme-violet'
      ); 

      root.classList.add(`theme-${themeColor}`);
      if (!isDark) {
      }
    };

    applyTheme(); // 초기 적용

    const onSystemChange = () => {
      if (theme === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', onSystemChange);
    return () => mediaQuery.removeEventListener('change', onSystemChange);
  }, [theme, themeColor]);

  return <>{children}</>;
}
