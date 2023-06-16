/** @type {import('tailwindcss').Config} */
/* eslint-disable */
module.exports = {
  content: ['./src/**/*.{html,js,vue}', 
  'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gerttr: ['GerTT-regular'],
        gerttb: ['GerTT-bold'],
        gerttsm: ['GerTT-medium']
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
