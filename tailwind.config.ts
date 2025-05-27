import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ✅ Base & Role Colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        border: 'oklch(var(--border))',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },

        // ✅ Feedback Colors
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',

        // ✅ Chart Colors
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
          6: 'var(--chart-6)',
          7: 'var(--chart-7)',
          8: 'var(--chart-8)',
          9: 'var(--chart-9)',
          10: 'var(--chart-10)',
          11: 'var(--chart-11)',
          12: 'var(--chart-12)',
          13: 'var(--chart-13)',
          14: 'var(--chart-14)',
          15: 'var(--chart-15)',
          16: 'var(--chart-16)',
          17: 'var(--chart-17)',
          18: 'var(--chart-18)',
          19: 'var(--chart-19)',
          20: 'var(--chart-20)',
          21: 'var(--chart-21)',
          22: 'var(--chart-22)',
          23: 'var(--chart-23)',
          24: 'var(--chart-24)',
          25: 'var(--chart-25)',
          26: 'var(--chart-26)',
          27: 'var(--chart-27)',
          28: 'var(--chart-28)',
          29: 'var(--chart-29)',
          30: 'var(--chart-30)',
        },
      },

      fontSize: {
        display: 'var(--text-display)',
        title: 'var(--text-title)',
        subtitle: 'var(--text-subtitle)',
        heading: 'var(--text-heading)',
        subheading: 'var(--text-subheading)',
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
        icon: 'var(--spacing-icon)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
