/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#99f6e4', // Color primario claro
          DEFAULT: '#2dd4bf', // Color primario (default)
          dark: '#0d9488', // Color primario oscuro
        }
      },
      flex: {
        '2': '2 2 0%'
      },
      keyframes: {
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-3rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down": "slide-down 300ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
