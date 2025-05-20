import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefaff",
          100: "#dbf1ff",
          200: "#b8e8ff",
          300: "#83daff",
          400: "#48c4ff",
          500: "#1eaaff",
          600: "#0088ff",
          700: "#0071e2",
          800: "#0762be",
          900: "#0c529a",
          950: "#0b3974",
        },
        secondary: {
          50: "#f4f1ff",
          100: "#ece5ff",
          200: "#ded1ff",
          300: "#c3adff",
          400: "#a37eff",
          500: "#8a4eff",
          600: "#7c2dff",
          700: "#6a1de3",
          800: "#5919be",
          900: "#49169a",
          950: "#2c0974",
        },
        accent: {
          // Teal accent for extra color pop
          50: "#edfcfa",
          100: "#d0f7f2",
          200: "#a5eee5",
          300: "#6de0d4",
          400: "#36c7bc",
          500: "#1ca69d",
          600: "#158981",
          700: "#156e69",
          800: "#165754",
          900: "#174847",
          950: "#05302e",
        },
        tertiary: {
          // Coral/pink for playful accents
          50: "#fff1f2",
          100: "#ffe0e4",
          200: "#ffc9d1",
          300: "#ffa3b3",
          400: "#ff758b",
          500: "#ff4365",
          600: "#f32147",
          700: "#cf1338",
          800: "#af1335",
          900: "#961537",
          950: "#530616",
        },
        background: {
          light: "#f9faff", // Slightly bluer tint
          dark: "#10172e", // Deeper blue-black
        },
        glass: {
          light: "rgba(255, 255, 255, 0.25)",
          dark: "rgba(15, 23, 42, 0.45)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-playful": "linear-gradient(165deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "playful-sm": "4px 4px 0px 0px var(--tw-shadow-color)",
        "playful-md": "6px 6px 0px 0px var(--tw-shadow-color)",
        "playful-lg": "8px 8px 0px 0px var(--tw-shadow-color)",
        "glow-primary": "0 0 15px rgba(30, 170, 255, 0.5)",
        "glow-primary-hover": "0 0 25px rgba(30, 170, 255, 0.7)",
        "glow-accent": "0 0 15px rgba(28, 166, 157, 0.5)",
        "glow-accent-hover": "0 0 25px rgba(28, 166, 157, 0.7)",
        "glow-tertiary": "0 0 15px rgba(255, 67, 101, 0.5)",
        "glow-tertiary-hover": "0 0 25px rgba(255, 67, 101, 0.7)",
      },
      backdropBlur: {
        glass: "16px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "float-delayed-slow": "float 12s ease-in-out 3s infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      borderRadius: {
        "playful": "0.75rem 0.25rem 0.75rem 0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;

