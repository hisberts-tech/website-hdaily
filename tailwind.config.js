/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hd-primary': '#10b981',
        'hd-primary-dark': '#059669',
        'hd-secondary': '#1F2A2E',
        'hd-cream': '#FDF9F2',
        'hd-light': '#F5F0E8',
        'hd-border': '#E8DFD3',
        'hd-text': '#4F5A5E',
        'hd-muted': '#6E7A7A',
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
