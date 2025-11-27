/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './services/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sophisticated Earthy Palette
        harvest: {
          50: '#fbf8f6', // Very light cream
          100: '#f5efe9', // Light cream
          200: '#ebdcd3', // Beige
          300: '#dec0b0', // Muted peach
          400: '#cf9d86', // Terracotta light
          500: '#c07758', // Terracotta main
          600: '#a65d40', // Burnt sienna
          700: '#8a4a33', // Deep rust
          800: '#733f2e', // Dark rust
          900: '#5e3529', // Brown
          950: '#331b14', // Dark brown
        },
        // Muted Sage/Ocean for contrast
        hope: {
          50: '#f4f7f7',
          100: '#e3ebeb',
          200: '#c6d8d8',
          300: '#9ebdbd',
          400: '#769e9e',
          500: '#588282', // Muted Sage
          600: '#466969',
          700: '#3b5656',
          800: '#334747',
          900: '#2d3b3b',
          950: '#1a2424',
        },
        // Rich Charcoal/Blacks
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524', // Warm charcoal
          900: '#1c1917', // Almost black
          950: '#0c0a09',
        },
        pumpkin: {
          500: '#c07758', // Mapped to harvest-500 for backward compatibility
          600: '#a65d40', // Mapped to harvest-600
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-down': 'fadeInDown 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
