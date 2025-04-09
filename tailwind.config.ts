import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // 다크모드 class 기반
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--color-primary)',
      },
    },
  },
  plugins: [],
};
export default config;
