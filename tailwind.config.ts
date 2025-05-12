import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Base & Role Colors */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        borderColor: {
          DEFAULT: 'oklch(var(--border))',
        },
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

        /* Feedback Colors */
        success: {
          DEFAULT: 'var(--color-success)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
        },

        /* Chart Colors */
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },

        /* Sidebar Group */
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
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
