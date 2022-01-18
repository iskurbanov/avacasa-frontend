module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 3px 15px 5px rgba(0,0,0,0.3)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
