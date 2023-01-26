/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          500: '#d2d2d2',
        },
        'layoutGray': {
          lightUp: '#f8f8f6',
          light: '#E6E6E6',
          DEFAULT: '#C6C7CD', // f9d270
          deep: '#92929A',
        },
      },
      width: {
        'signUpLayout': '120px',
        'login': '500px',
      },
      height: {
        'signUpLayout': '360px',
      },
      spacing: {
        'asideWidth': '300px',
        'headerHeight': '60px',
      },
    },
  },
  plugins: [],
}
