/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF', 100: '#EDE9FE', 200: '#DDD6FE',
          300: '#C4B5FD', 400: '#A78BFA', 500: '#8B5CF6',
          600: '#7C3AED', 700: '#6D28D9', 800: '#5B21B6', 900: '#4C1D95',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#EC4899', 50: '#FCE7F3', 100: '#FCE7F3',
          200: '#FBCFE8', 400: '#F472B6', 500: '#EC4899',
          600: '#DB2777', 700: '#BE185D', foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F59E0B', 50: '#FFFBEB', 100: '#FEF3C7',
          500: '#F59E0B', 600: '#D97706', 700: '#B45309', foreground: '#FFFFFF',
        },
        success: { DEFAULT: '#10B981', foreground: '#FFFFFF' },
        error: { DEFAULT: '#EF4444', foreground: '#FFFFFF' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['DM Serif Display', 'Poppins', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { lg: '12px', md: '8px', sm: '6px' },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
