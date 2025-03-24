import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 다크모드 class 기반
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5a5f',
      },
    },
  },
  plugins: [],
}
export default config;
