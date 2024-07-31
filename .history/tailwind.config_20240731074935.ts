import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          primary: 'skyblue',
          secondary: 'black',
          textColor: 'gray',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
