import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        green: {
          extend: "light",
          colors: {
            primary: {
              DEFAULT: "#16a34a",
            },
            danger: {
              DEFAULT: "#ec4899",
            },
            warning: {
              DEFAULT: "#fef08a",
            },
          },
        },
      },
    }),
  ],
};
