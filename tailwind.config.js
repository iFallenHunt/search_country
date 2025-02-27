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
        primary: '#2B3945',
        secondary: '#202C37',
        textLight: '#111517',
        textDark: '#FFFFFF',
        bgLight: '#FAFAFA',
        bgDark: '#202C37',
        elementLight: '#FFFFFF',
        elementDark: '#2B3945',
      },
    },
  },
  plugins: [],
} 