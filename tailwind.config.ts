import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',

        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: 'var(--color-destructive)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontSize: {
        heading: 'var(--text-heading)',
        body: 'var(--text-body)',
        label: 'var(--text-label)',
        caption: 'var(--text-caption)',
      },
      spacing: {
        tight: 'var(--spacing-tight)',
        compact: 'var(--spacing-compact)',
        element: 'var(--spacing-element)',
        component: 'var(--spacing-component)',
        spacious: 'var(--spacing-spacious)',
        section: 'var(--spacing-section)',
      },
      borderRadius: {
        input: 'var(--radius-input)',
        DEFAULT: 'var(--radius-default)',
        card: 'var(--radius-card)',
        section: 'var(--radius-section)',
      },
    },
  },
  plugins: [],
};

export default config;
