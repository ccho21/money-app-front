// 📄 tailwind.config.ts (의미 기반 디자인 시스템 확장)

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-on-primary)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-text)',

        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted)',
        },
        border: 'var(--color-border)',

        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontSize: {
        heading: 'var(--text-heading)', // ≈ text-lg
        body: 'var(--text-body)', // ≈ text-base
        label: 'var(--text-label)', // ≈ text-sm
        caption: 'var(--text-caption)', // ≈ text-xs
      },
      spacing: {
        tight: 'var(--spacing-tight)', // 0.25rem
        compact: 'var(--spacing-compact)', // 0.5rem
        element: 'var(--spacing-element)', // 0.75rem
        component: 'var(--spacing-component)', // 1rem
        spacious: 'var(--spacing-spacious)', // 1.25rem
        section: 'var(--spacing-section)', // 5rem
      },
      borderRadius: {
        input: 'var(--radius-input)', // 0.375rem
        default: 'var(--radius-default)', // 0.5rem
        card: 'var(--radius-card)', // 0.75rem
        section: 'var(--radius-section)', // 1rem
      },
    },
  },
  plugins: [],
};

export default config;
