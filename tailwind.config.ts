/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.green,
          DEFAULT: "#72b140",
        },
        secondary: {
          ...colors.fuchsia,
        },
        accent: {
          ...colors.amber,
        },
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      fontFamily: {
        sans: ["JetBrains Mono", ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        // base: ["1.125rem", "1.4375rem"],
      }
    },
  },
};
