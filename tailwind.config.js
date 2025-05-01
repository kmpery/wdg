/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-blue-800',
    'text-pink-800',
    'text-indigo-800',
    'text-yellow-800',
    'text-teal-800',
    'text-emerald-800',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FEF9F3',
        gold: {
          100: '#FEF6E4',
          200: '#FEEDD3',
          300: '#F3DAAD',
          400: '#E6C988',
          500: '#D4AF37',
          600: '#B8972F',
          700: '#9C7F27',
          800: '#7F671F',
          900: '#635017',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'pattern-light':
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
