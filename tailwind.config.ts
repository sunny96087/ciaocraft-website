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
        // 'Primary-Orange': '#EA580C',
        // 'Primary-Dark': '#E1580E',
        // 'Primary-light': '#FA6C23',
        // 'Orange-light': '#F59460',
        // 'Orange-light-2': '#F8B490',
        // 'Secondary-Blue': '#255C99',
        // 'Secondary-Dark': '#1C3FB7',
        // 'Secondary-light': '#5284BC',
        // 'Blue-light-2': '#5595DC',
        // 'Blue-light-3': '#6BABF3',
        // 'Blue-light-4': '#A1CEFF',
        // 'Blue-light-5': '#E3E8FA',
        // 'Gray-1': '#F9FAFB',
        // 'Gray-2': '#F3F4F6',
        // 'Gray-3': '#E5E7EB',
        // 'Gray-4': '#DEE2E6',
        // 'Gray-5': '#CED4DA',
        // 'Gray-6': '#CED4DA',
        // 'Gray-7': '#CED4DA',
        // 'Primary-Text': '#292524',
        // hr ------------
        primary: '#EA580C',
        'primary-dark': '#e1580e',
        'primary-light': '#fa6c23',
        orange1: '#f59460',
        orange2: '#f8b490',
        orange3: '#fbd5c0',
        orange4: '#fde5d8',
        orange5: '#fff0e9',
        secondary: '#255c99',
        'secondary-dark': '#1c3fb7',
        'secondary-light': '#5284bc',
        blue2: '#5595dc',
        blue3: '#6babf3',
        blue4: '#a1ceff',
        blue5: '#e3e8fa',
        success: '#005c69',
        danger: '#db2955',
        dark1: '#292524',
        dark2: '#44403c',
        dark3: '#57534e',
        dark4: '#78716c',
        dark5: '#a8a29e',
        dark6: '#d6d3d1',
        dark7: '#e7e5e4',
        dark8: '#f5f5f4',
        gray1: '#f9fafb',
        gray2: '#f3f4f6',
        gray3: '#e5e7eb',
        gray4: '#dee2e6',
        gray5: '#ced4da',
        'text-primary': '#292524',
        'text-secondary': '#7d7d7d'
      }
    }
  },
  plugins: []
}
