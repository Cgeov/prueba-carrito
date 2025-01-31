/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        csRed: 'var(--custom-red)',
        csRose900: 'var(--custom-rose-900)',
        csRose500: 'var(--custom-rose-500)',
        csRose400: 'var(--custom-rose-400)',
        csRose300: 'var(--custom-rose-300)',
        csRose100: 'var(--custom-rose-100)',
        csRose50: 'var(--custom-rose-50)',
        csGreen: 'var(--custom-green)',
      }
    },
  },
  plugins: [],
}

