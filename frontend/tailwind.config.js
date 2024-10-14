
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",  // Incluye las clases de PrimeReact
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradiente': 'linear-gradient(to right, #317EF4, #8E2BFF)',
      },
      boxShadow: {
        'soft': '0 0 15px rgba(0, 0, 0, 0.2)',
        'soft-md': '0 1px 1px rgba(0,0,0,0.1)'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'regular': '12px',
        'title': '22px'
      },
      colors: {
        'purple': '#8E2BF',
        'blue': '#317EF4',
        'primary': '#C5C5C5',
        'secondary': '#555555'
      }
    },
  },
  plugins: [],
};