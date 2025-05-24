/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        // Esta media query se activa cuando la altura es menor a 640px
        //Si la altura de la pantalla es menor a 640px, se aplicará esta clase
        'max-h-[640px]': {'raw': '(max-height: 640px)'},

        // Esta media query se activa cuando la altura es mayor o igual a 640px
        'h-[640px]': {'raw': '(min-height: 640px)'},
      },
    },
  },
  plugins: [],
};