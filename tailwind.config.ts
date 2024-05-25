/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './{App,app}.{js,ts,vue}',
    './{Error,error}.{js,ts,vue}',
    './app.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'Primary-Orange': '#EA580C',
        'Primary-Dark': '#E1580E',
        'Primary-light': '#FA6C23',
        'Orange-light': '#F59460',
        'Orange-light-2': '#F8B490',
        'Secondary-Blue': '#255C99',
        'Secondary-Dark': '#1C3FB7',
        'Secondary-light': '#5284BC',
        'Blue-light-2': '#5595DC',
        'Blue-light-3': '#6BABF3',
        'Blue-light-4': '#A1CEFF',
        'Blue-light-5': '#E3E8FA',
        'Gray-1': '#F9FAFB',
        'Gray-2': '#F3F4F6',
        'Gray-3': '#E5E7EB',
        'Gray-4': '#DEE2E6',
        'Gray-5': '#CED4DA',
        'Gray-6': '#CED4DA',
        'Gray-7': '#CED4DA',
        'Primary-Text': '#292524'
      }
    }
  },
  plugins: []
}
