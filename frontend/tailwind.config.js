
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",  // Incluye las clases de PrimeReact
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 0 15px rgba(0, 0, 0, 0.2)',
        'soft-md': '0 1px 1px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
};
