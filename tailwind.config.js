/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#000000',
          surface: '#0d0d0f',
          surfaceLight: '#17171a',
          card: 'rgba(18, 18, 20, 0.75)',
          border: 'rgba(255, 255, 255, 0.1)',
          borderGlow: 'rgba(255, 255, 255, 0.3)',
        },
        mono: {
          white: '#ffffff',
          light: '#f4f4f5',
          muted: '#a1a1aa',
          dark: '#18181b',
        },
        crimson: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          dark: '#450a0a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        poster: ['"Bebas Neue"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'mono-glow': '0 0 25px -4px rgba(255, 255, 255, 0.35)',
        'mono-sm': '0 0 12px rgba(255, 255, 255, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        'glass-hover': '0 8px 32px 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
