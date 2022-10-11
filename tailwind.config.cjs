/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red:{
          DEFAULT: '#ff4998',
        },
        green:{
          DEFAULT: '#00cc74',
        }
      }
    },
  },
  plugins: [],
};
