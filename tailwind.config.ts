import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellow: {
          custom: '#F8E9A1', // Использование вашего цвета
        },
        red: {
          custom: '#F76C6C',
        },
        blue: {
          light: '#A8D0E6',
          dark: '#374785',
        },
        navy: {
          darkest: '#24305E',
        },
        black: {
          darkest: '#19181A',
        },
        gray:{
          background: '#363a3f',
        },
      },
      keyframes: {
        slideDownIn: {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDownOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-30%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" }
        },
        fadeOut: {
          '0%': { opacity: "1" },
          '100%': { opacity: "0" }
        }
      },
      animation: {
        slideDownIn: 'slideDownIn 0.35s ease-out forwards',
        slideDownOut: 'slideDownOut 0.35s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards'
      },
    },
  },
  plugins: [],
};
export default config;
