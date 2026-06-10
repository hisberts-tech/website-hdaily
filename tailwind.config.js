/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All hd-* colors reference CSS variables so they flip with [data-theme="dark"]
        'hd-primary':      'rgb(var(--c-primary)     / <alpha-value>)',
        'hd-primary-dark': 'rgb(var(--c-primary-dark)/ <alpha-value>)',
        'hd-secondary':    'rgb(var(--c-secondary)   / <alpha-value>)',
        'hd-cream':        'rgb(var(--c-cream)        / <alpha-value>)',
        'hd-light':        'rgb(var(--c-light)        / <alpha-value>)',
        'hd-border':       'rgb(var(--c-border)       / <alpha-value>)',
        'hd-text':         'rgb(var(--c-text)         / <alpha-value>)',
        'hd-muted':        'rgb(var(--c-muted)        / <alpha-value>)',
        'hd-surface':      'rgb(var(--c-surface)      / <alpha-value>)',
        'hd-surface2':     'rgb(var(--c-surface2)     / <alpha-value>)',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'premium': '0 25px 35px -12px rgba(0, 0, 0, 0.12)',
        'card': '0 4px 12px rgba(16, 185, 129, 0.2)',
        'card-hover': '0 8px 20px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  plugins: [],
}
