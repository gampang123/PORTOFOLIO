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
          bg: '#07080e',
          surface: '#0d101a',
          surfaceLight: '#141826',
          card: 'rgba(14, 18, 30, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(0, 240, 255, 0.25)',
        },
        neon: {
          cyan: '#00f0ff',
          cyanDark: '#0891b2',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 25px -4px rgba(168, 85, 247, 0.5)',
        'neon-sm': '0 0 10px rgba(0, 240, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-hover': '0 8px 32px 0 rgba(0, 240, 255, 0.15)',
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
