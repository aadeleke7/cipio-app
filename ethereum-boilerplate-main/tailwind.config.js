/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        110: "27.5rem",
        120: "30rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        170: "42.5rem",
        200: "150rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
