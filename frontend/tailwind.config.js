/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom": '#6a0dad',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        "light": {
          ...require("daisyui/src/theming/themes")["light"],
          "custom": '#6a0dad',
        }
      },
      "dark"
    ],
  },
}

