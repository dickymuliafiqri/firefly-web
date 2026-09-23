/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'night-top': '#020617',
        'night-bottom': '#08152a',
        soil: '#140e08',
        surface: 'rgba(15, 23, 42, 0.65)',
        card: 'rgba(30, 41, 59, 0.45)',
        overlay: 'rgba(2, 6, 23, 0.85)',
        biolum: {
          glow: '#f0ffb4',
          aura: '#bef264',
          dim: 'rgba(190, 242, 100, 0.15)',
        },
        accent: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#f43f5e',
          violet: '#8b5cf6',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          medium: 'rgba(255, 255, 255, 0.12)',
          focus: 'rgba(190, 242, 100, 0.40)',
        },
        ink: '#e8eef9',
        muted: '#93a5c4',
        faint: '#64748b',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'biolum-sm': '0 0 10px rgba(190, 242, 100, 0.3)',
        'biolum-md': '0 0 20px rgba(190, 242, 100, 0.4)',
      },
      animation: {
        aurora: 'aurora 20s ease infinite alternate',
        twinkle: 'twinkle 4.2s ease-in-out infinite',
        buried: 'buried 5s ease-in-out infinite',
        panelfade: 'panelfade 0.45s ease',
        dgflow: 'dgflow 1.35s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%': { opacity: '0.015', transform: 'scale(1) translateY(0)' },
          '50%': { opacity: '0.03', transform: 'scale(1.05) translateY(-10px)' },
          '100%': { opacity: '0.02', transform: 'scale(1) translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' },
          '50%': { opacity: '0.85', transform: 'scale(1.15)' },
        },
        buried: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        panelfade: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        dgflow: {
          to: { strokeDashoffset: '-12' },
        },
      },
    },
  },
  plugins: [],
};