/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#06060a',
          soft: '#0b0b12',
          panel: '#0e0e17',
          elev: '#13131e',
        },
        neon: {
          green: '#00ff88',
          cyan: '#00d4ff',
          purple: '#a855f7',
          orange: '#ff6b35',
        },
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 0 1px rgba(0,255,136,0.35), 0 0 24px -4px rgba(0,255,136,0.45)',
        'neon-cyan': '0 0 0 1px rgba(0,212,255,0.35), 0 0 24px -4px rgba(0,212,255,0.45)',
        'neon-purple': '0 0 0 1px rgba(168,85,247,0.35), 0 0 24px -4px rgba(168,85,247,0.45)',
        'neon-orange': '0 0 0 1px rgba(255,107,53,0.35), 0 0 24px -4px rgba(255,107,53,0.45)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 10px 30px -10px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(60% 50% at 50% 0%, rgba(0,212,255,0.10), transparent 70%), radial-gradient(40% 40% at 80% 30%, rgba(168,85,247,0.08), transparent 70%), radial-gradient(40% 40% at 10% 70%, rgba(0,255,136,0.06), transparent 70%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink-caret': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,255,136,0.0)' },
          '50%': { boxShadow: '0 0 24px 2px rgba(0,255,136,0.35)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridmove: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '40px 40px, 40px 40px' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-up': 'slide-up 0.7s ease-out both',
        'blink-caret': 'blink-caret 1s steps(1) infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        gridmove: 'gridmove 20s linear infinite',
      },
    },
  },
  plugins: [],
};