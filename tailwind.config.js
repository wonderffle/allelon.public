/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  plugins: [require('@tailwindcss/forms')],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
}
