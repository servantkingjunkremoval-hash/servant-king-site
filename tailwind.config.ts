import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Servant King brand palette
        purple: {
          DEFAULT: '#4B2E83',
          dark: '#35206B',
          darker: '#261650',
          light: '#6B4AA8'
        },
        gold: {
          DEFAULT: '#C9A14A',
          dark: '#A88237',
          light: '#E0BF6E'
        },
        cream: '#F8F5EF',
        warmCream: '#EFE9DC',
        charcoal: {
          DEFAULT: '#1F1A17',
          light: '#2D2621'
        },
        muted: '#6B6158'
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.03em'
      },
      maxWidth: {
        content: '1200px',
        narrow: '780px'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
