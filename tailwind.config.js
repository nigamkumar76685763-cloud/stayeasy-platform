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
        room: {
          primary: '#4F46E5',
          secondary: '#7C3AED',
          accent: '#F59E0B',
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        food: {
          primary: '#EF4444',
          secondary: '#F97316',
          accent: '#F59E0B',
          light: '#FFF7ED',
          dark: '#1C1917',
        },
        brand: {
          indigo: '#4F46E5',
          violet: '#7C3AED',
          amber: '#F59E0B',
          red: '#EF4444',
          orange: '#F97316',
          emerald: '#10B981',
          slate: '#0F172A',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'modal': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-hover': '0 14px 40px 0 rgba(31, 38, 135, 0.25)',
        'glow-indigo': '0 0 25px rgba(79, 70, 229, 0.35)',
        'glow-orange': '0 0 25px rgba(239, 68, 68, 0.35)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
      }
    },
  },
  plugins: [],
}
