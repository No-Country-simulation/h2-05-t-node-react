
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
        'gradiente-opacity': 'linear-gradient(to right, rgba(49, 126, 244, 0.75), rgba(142, 43, 255, 0.75))',
      },
      boxShadow: {
        'soft': '0 0 15px rgba(0, 0, 0, 0.2)',
        'soft-md': '0 1px 1px rgba(0,0,0,0.1)'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'regular': '12.42px',
        'regular-14': '14px',
        'regular-16': '16px',
        'regular-18': '18px',
        'medium': '39.45px',
        'title': '22px'
      },
      colors: {
        'purple': '#8E2BFF',
        'blue': '#317EF4',
        'primary': '#C5C5C5',
        'secondary': '#555555',
        'tertiary': '#8D8D8D',
        'soft-gray': '#F3F4F5',
        'search': '#EFEFF0',
        'black': '#181818',
        'ranking-user': '#C2DAFF'
      }
    },
  },
  plugins: [],
};
