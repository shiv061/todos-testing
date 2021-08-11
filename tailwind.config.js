module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: { primary: '#161621', secondary: '#25273c', write: '#999ab4' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
