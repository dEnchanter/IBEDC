const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-bulb': "url('/login-bulb.png')",
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        maxHeight: 'max-height',
      },
      width: {
        112: '28rem',
        144: '36rem',
        208: '52rem',
      },
      maxHeight: {
        104: '26rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        144: '36rem',
      },
      height: {
        104: '26rem',
        112: '28rem',
        124: '31rem',
        // 132: "33rem",
        // 140: "35rem",
        160: '40rem',
        // 156: "39rem",
      },
      colors: {
        'ibedc-brand-orange': {
          DEFAULT: '#F39500',
        },
      },
    },
  },
  plugins: [],
};
