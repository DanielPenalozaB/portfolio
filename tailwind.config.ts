import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        'courier-prime': ['var(--font-courier-prime)'],
      },
      colors: {
        light: '#F6F6F6',
        dark: '#0E0E0E',
        waikawa: {
          '50': '#f2f7fb',
          '100': '#e7f0f8',
          '200': '#d3e3f2',
          '300': '#b9d0e8',
          '400': '#9cb6dd',
          DEFAULT: '#839dd1',
          '600': '#6a80c1',
          '700': '#596ca9',
          '800': '#4a5a89',
          '900': '#414e6e',
          '950': '#262d40',
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
